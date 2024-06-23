import { BleClient } from '@capacitor-community/bluetooth-le';
import { consoleMessages as consoleMessagesStore, devices as devicesStore } from './stores';
import { onMount } from 'svelte';
let consoleMessages;
let devices;
let accumulatedData = '';
export const serviceUuid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const characteristicUuid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
export function longpress(node, threshold = 500, moveThreshold = 10) {
	let startX, startY;
	let timeout;

	const handle_pointerdown = (event) => {
		startX = event.clientX;
		startY = event.clientY;
		let start = Date.now();

		timeout = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, threshold);

		node.addEventListener('pointermove', handle_pointermove);
		node.addEventListener('pointerup', cancel);
		node.addEventListener('pointerleave', cancel);
	};

	const handle_pointermove = (event) => {
		const diffX = event.clientX - startX;
		const diffY = event.clientY - startY;
		if (Math.sqrt(diffX * diffX + diffY * diffY) > moveThreshold) {
			cancel();
		}
	};

	const cancel = () => {
		clearTimeout(timeout);
		node.removeEventListener('pointermove', handle_pointermove);
		node.removeEventListener('pointerup', cancel);
		node.removeEventListener('pointerleave', cancel);
	};

	node.addEventListener('pointerdown', handle_pointerdown);

	return {
		destroy() {
			node.removeEventListener('pointerdown', handle_pointerdown);
		}
	};
}

export function hex2a(hexx) {
	var hex = hexx.toString(); //force conversion
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}
export function handleCharacteristicValueChanged(event, deviceId) {
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
			processData(accumulatedData, deviceId);
			accumulatedData = ''; // Reset for the next message
		}
	} catch (error) {
		alert('error: ' + error.message);
	}
}

export function processData(data, deviceId) {
	try {
		let jsonData = JSON.parse(data);
		console.log('Received JSON:', jsonData);

		// set device data to the parsed JSON
		devicesStore.set(devices.map((d) => (d.id === deviceId ? { ...d, settings: jsonData } : d)));

		// add it to consoleMessages
		if (!jsonData.type || !jsonData.value) return;
		consoleMessagesStore.update((messages) => [
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
}

export async function connectDevice(deviceId, silent = false) {
	try {
		await BleClient.connect(deviceId, async () => {
			// handle disconnect
			await BleClient.stopNotifications(deviceId, serviceUuid, characteristicUuid);
		});
		await BleClient.startNotifications(deviceId, serviceUuid, characteristicUuid, (event) => {
			handleCharacteristicValueChanged(event, deviceId);
		});
		// send 0x01 to recieve data
		await BleClient.write(deviceId, serviceUuid, characteristicUuid, new Uint8Array([0x01]));
		return true;
	} catch (error) {
		if (!silent) alert(error);
		return false;
	}
}
export async function rebootDevice(deviceId) {
	BleClient.write(deviceId, serviceUuid, characteristicUuid, new Uint8Array([0xf1, 0x02]));
	await BleClient.disconnect(deviceId);
	await new Promise((resolve) => setTimeout(resolve, 500));
	// reconnect
	let success = await connectDevice(deviceId, false);
	if (success)
		devicesStore.set(devices.map((d) => (d.id === deviceId ? { ...d, status: 'connected' } : d)));
}

export async function syncDevice(deviceId) {
	let tempDevice = devices.find((d) => d.id === deviceId);

	BleClient.write(tempDevice.id, serviceUuid, characteristicUuid, new Uint8Array([0xf1, 0x01]));
	while (!tempDevice.settings) {
		await new Promise((resolve) => setTimeout(resolve, 100));
		tempDevice = devices.find((d) => d.id === deviceId);
	}
	tempDevice = {
		...tempDevice,
		...tempDevice.settings
	};
	devicesStore.set(devices.map((d) => (d.id === deviceId ? tempDevice : d)));
	return;
}

export async function factoryReset(deviceId) {
	// send 0xf1 0x03 to reset the device
	BleClient.write(deviceId, serviceUuid, characteristicUuid, new Uint8Array([0xf1, 0x03]));
	return;
}

export async function readController(deviceId, hexCode) {
	try {
		consoleMessagesStore.subscribe((value) => (consoleMessages = value));
		devicesStore.subscribe((value) => (devices = value));
		// set oldConsoleMessages to consoleMessages where the .value begins with the 0xhexCode
		let oldConsoleMessages = consoleMessages.length;
		let newConsoleMessages = oldConsoleMessages;
		await BleClient.write(
			deviceId,
			serviceUuid,
			characteristicUuid,
			new Uint8Array([0xf3, hexCode])
		);
		while (oldConsoleMessages === newConsoleMessages) {
			await new Promise((resolve) => setTimeout(resolve, 100));
			// set newConsoleMessages to consoleMessages where the .value begins with the 0xhexCode
			newConsoleMessages = consoleMessages.length;
		}
		let filteredMessages = consoleMessages;
		// alert the last message
		return filteredMessages[filteredMessages.length - 1];
	} catch (error) {
		alert('error: ' + error.message);
	}
}
