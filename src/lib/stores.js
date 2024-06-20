import { BleClient } from '@capacitor-community/bluetooth-le';
import { writable } from 'svelte/store';
import { characteristicUuid, serviceUuid } from './general';
let accumulatedData;
const defaultFunctions = {
	async add(device, type) {
		// connect to the device first
		let connectionInfo = await oldDevices[type]?.connect(device.id);
		device.status = 'connected';
		device.connectedTo = type;
		// if its already inside oldDevices, then do nothing
		if (oldDevices.list.find((d) => d.id === device.id)) return;
		devices.set({ ...oldDevices, list: [...oldDevices.list, device] });
		return;
	},
	async delete(deviceId) {
		let device = oldDevices.list.find((d) => d.id === deviceId);
		await devices[device.type]?.disconnect(deviceId);
		devices.set({ ...oldDevices, list: oldDevices.list.filter((d) => d.id !== deviceId) });
		return;
	}
};
function hex2a(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}
const devices = writable({
	list: [],
	bluetooth: {
		handleCharacteristicValueChanged(event, deviceId) {
			// convert the dataview event to a hexadecimal string
			try {
				let value = new Uint8Array(event.buffer).reduce(
					(acc, i) => acc + i.toString(16).padStart(2, '0'),
					''
				);
				if (value.startsWith('ff')) {
					accumulatedData = '';
					value = value.slice(2);
				} else if (accumulatedData.length <= 0) {
					return;
				}
				// convert value to ascii
				let chunk = hex2a(value);

				accumulatedData += chunk;
				// Assuming the transmission ends when a specific delimiter is found, e.g., "\n"
				if (chunk.endsWith('}')) {
					oldDevices.bluetooth.processData(accumulatedData, deviceId);
					accumulatedData = ''; // Reset for the next message
				}
			} catch (error) {
				alert('error: ' + error.message);
			}
		},
		processData(data, deviceId) {
			try {
				let jsonData = JSON.parse(data);

				// set device data to the parsed JSON
				devices.set({
					...oldDevices,
					list: oldDevices.list.map((d) => (d.id === deviceId ? { ...d, settings: jsonData } : d))
				});

				// add it to consoleMessages
				if (!jsonData.type || !jsonData.value) return;
				consoleMessages.update((messages) => [
					...messages,
					{
						time: new Date().toLocaleTimeString(),
						name: jsonData.type,
						message: jsonData.value
					}
				]);
			} catch (error) {
				alert(error.message);
			}
		},
		async connect(deviceId) {
			// set device from devices list to connectedTo bluetooth
			devices.set({
				...oldDevices,
				list: oldDevices.list.map((d) =>
					d.id === deviceId ? { ...d, connectedTo: 'bluetooth', loading: true } : d
				)
			});
			await BleClient.connect(deviceId, async () => {
				// handle disconnect
				devices.set({
					...oldDevices,
					list: oldDevices.list.map((d) =>
						d.id === deviceId
							? { ...d, connectedTo: 'bluetooth', loading: false, status: 'disconnected' }
							: d
					)
				});
				await BleClient.stopNotifications(deviceId, serviceUuid, characteristicUuid);
			});
			await BleClient.startNotifications(deviceId, serviceUuid, characteristicUuid, (event) => {
				try {
					oldDevices.bluetooth.handleCharacteristicValueChanged(event, deviceId);
				} catch (error) {
					alert('error: ' + error.message);
					alert(JSON.stringify(oldDevices.bluetooth));
				}
			});
			// send 0x01 to recieve data
			await BleClient.write(deviceId, serviceUuid, characteristicUuid, new Uint8Array([0x01]));

			devices.set({
				...oldDevices,
				list: oldDevices.list.map((d) =>
					d.id === deviceId
						? { ...d, connectedTo: 'bluetooth', loading: false, status: 'connected' }
						: d
				)
			});
			return true;
		},
		async reboot(deviceId) {
			BleClient.write(deviceId, serviceUuid, characteristicUuid, new Uint8Array([0xf1, 0x02]));
			await BleClient.disconnect(deviceId);
			await new Promise((resolve) => setTimeout(resolve, 500));
			// reconnect
			let success = await oldDevices.bluetooth.connect(deviceId, false);
		},
		async sync(deviceId) {
			let device = oldDevices.list.find((d) => d.id === deviceId);
			BleClient.write(device.id, serviceUuid, characteristicUuid, new Uint8Array([0xf1, 0x01]));
			while (!device.settings) {
				await new Promise((resolve) => setTimeout(resolve, 100));
				device = oldDevices.list.find((d) => d.id === deviceId);
			}
			device = {
				...device,
				...device.settings
			};
			devices.set({
				...oldDevices,
				list: oldDevices.list.map((d) => (d.id === deviceId ? device : d))
			});
			return;
		}
	},
	wifi: {},
	...defaultFunctions
});
const consoleMessages = writable([]);
const modal = writable({
	bluetooth: false,
	wifi: false
});
let oldDevices = {};

devices.subscribe((value) => {
	// Flag to check if any device needs updating
	oldDevices = value;
	let needsUpdate = false;
	let updatedDevices = value.list.map((d) => {
		if (!d.bluetooth || !d.bluetooth.connect) {
			needsUpdate = true;
			return {
				...d,
				bluetooth: {
					async connect(deviceId = d.id) {
						return await oldDevices.bluetooth.connect(deviceId);
					},
					async reboot(deviceId = d.id) {
						return await oldDevices.bluetooth.reboot(deviceId);
					},
					async sync(deviceId = d.id) {
						return await oldDevices.bluetooth.sync(deviceId);
					}
				},
				wifi: {},
				async delete() {
					return await oldDevices.delete(d.id);
				}
			};
		}
		return d;
	});

	if (needsUpdate) {
		oldDevices = { ...value, list: updatedDevices, ...defaultFunctions };
		devices.set(oldDevices);
	}
});
export { devices, consoleMessages, modal, defaultFunctions };
