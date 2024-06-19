<script>
	import { goto, onNavigate } from '$app/navigation';
	import { devices, consoleMessages, modal } from '$lib/stores';
	import {
		faChevronRight,
		faGear,
		faLinkSlash,
		faPersonBiking,
		faPlus,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { Affix, Button, Flex, Text, UnstyledButton, Loader, Card } from '@svelteuidev/core';
	import { BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';
	import { Haptics, ImpactStyle } from '@capacitor/haptics';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import DeviceModal from '../components/DeviceModal.svelte';
	import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
	import { connectDevice, longpress, syncDevice } from '$lib/general';
	import Header from '../components/Header.svelte';
	import { dev } from '$app/environment';
	const serviceUuid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
	const characteristicUuid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
	let scrollY = 0;
	const statusFormatter = (status) => {
		switch (status) {
			case 'connected':
				return {
					status: 'Connected',
					color: 'green'
				};
			default:
				return {
					status: status?.charAt(0).toUpperCase() + status?.slice(1) || ` `,
					color: 'red'
				};
		}
	};
	let quickButtons = [
		{
			type: 'delete',
			icon: faTrash,
			color: 'red',
			action: (device) => {
				devices.set($devices.filter((d) => d.id !== device.id));
			}
		},
		{
			type: 'disconnect',
			icon: faLinkSlash,
			action: async (device) => {
				await BleClient.disconnect(device.id);
				return;
			}
		},
		{
			type: 'settings',
			icon: faGear,
			action: (device) => {
				goto(`/device?id=${encodeURIComponent(device.id)}`);
			}
		}
	];
	async function addDevice() {
		try {
			await Haptics.impact({ style: ImpactStyle.Light });

			let bluetoothEnabled = await BleClient.isEnabled();
			if (!bluetoothEnabled) {
				alert('Bluetooth is disabled');
				return;
			}
			getBLEDevices(5000);
			$modal = true;
		} catch (error) {
			alert('Error adding device:', error.message);
		}
	}

	let getBLEDevices = async () => {};
	let allBLEDevices = [];
	let scanningTimeout;
	onMount(async () => {
		try {
			getBLEDevices = async (timeout) => {
				allBLEDevices = [];
				scanningTimeout = setTimeout(async () => {
					await BleClient.stopLEScan();
					return;
				}, timeout);
				try {
					await BleClient.requestLEScan({}, (result) => {
						// if the result.device.deviceId is already in the allBLEDevices array, update it
						if (allBLEDevices.some((d) => d.id === result.device.deviceId)) {
							allBLEDevices = allBLEDevices.map((d) =>
								d.id === result.device.deviceId
									? {
											...d,
											rssi: result.rssi,
											lastSeen: new Date().toLocaleTimeString()
										}
									: d
							);
						} else {
							allBLEDevices.push({
								name: result.localName,
								id: result.device.deviceId,
								rssi: result.rssi,
								lastSeen: new Date().toLocaleTimeString()
							});
						}
						// filter out devices with no name
						allBLEDevices = allBLEDevices.sort((a, b) => b.rssi - a.rssi).filter((d) => d.name);
					});
				} catch (error) {
					alert('Error initializing BLE client');
					console.error(error);
				}
			};

			try {
				await BleClient.initialize();
			} catch (error) {
				alert('Error initializing BLE client');
				console.error(error);
			}
		} catch (error) {
			console.error(error);
		}
	});
	let bluetoothDevices = [
		{
			name: 'Device 1',
			id: '1234'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<svelte:window on:scroll={() => (scrollY = window.scrollY)} />
<main>
	<DeviceModal
		title="Bluetooth"
		position="top"
		opened={$modal}
		on:close={() => {
			// stop scanning
			BleClient.stopLEScan();
			$modal = false;
		}}
		on:reload={() => {
			getBLEDevices(5000);
		}}
		loadingTime={5000}
	>
		<div class="bluetoothDevicesContainer">
			{#each allBLEDevices as device}
				<button
					class="unstyledButton"
					on:click={async () => {
						device.loading = true;
						let connection = await connectDevice(device.id);
						device.loading = false;
						if (!connection) return;

						// check if the id already exists
						if ($devices.some((d) => d.id === device.id)) {
							$modal = false;
							$devices = $devices.map((d) =>
								d.id === device.id ? { ...d, status: 'connected' } : d
							);
							return;
						}

						$devices = [
							...$devices,
							{
								...device,
								name: device.name,
								id: device.id,
								status: 'connected',
								loading: false
							}
						];
						$modal = false;
						device.loading = false;
						goto(`/device?id=${encodeURIComponent(device.id)}`);
					}}
				>
					<div class="bluetoothDeviceContainer">
						<div class="bluetoothDevice">
							<div class="bluetoothIcon">
								<Fa icon={faBluetoothB} size="1.5x" />
							</div>
							<div class="bluetoothDeviceDetails">
								<h3>{device.name}</h3>
								<p>{device.id}</p>
							</div>
						</div>
						{#if device.loading}
							<Loader color="gray" size={25} />
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</DeviceModal>
	<div class="devicesContainer">
		{#if $devices.length > 0}
			<div class="affix">
				<Button
					ripple
					override={{
						overflow: 'hidden'
					}}
					on:click={() => {
						addDevice();
					}}
				>
					<Flex
						override={{
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
							color: '#c4dbff'
						}}
					>
						<div class="plusIcon">
							<Fa icon={faPlus} size="1.3x" />
						</div>
						Add device</Flex
					></Button
				>
			</div>
			<div class="deviceGrid">
				{#each $devices as device}
					<button
						class="unstyledButton"
						use:longpress
						on:longpress={async () => {
							device.longpress = true;
							await Haptics.impact({ style: ImpactStyle.Heavy });
							// wait 10 seconds
							setTimeout(() => {
								device.longpress = false;
							}, 5000);
						}}
						override={{
							height: '100%'
						}}
						on:click={async () => {
							if (device.longpress) return;
							if (device.loading) return;
							device.loading = true;
							let connection = await connectDevice(device.id);

							device.loading = false;
							if (!connection) return;

							device.status = 'connected';
							await new Promise((resolve) => setTimeout(resolve, 100));
							if (connection) await syncDevice(device.id);
							goto(`/device?id=${encodeURIComponent(device.id)}`);
						}}
					>
						<div class="deviceContainer" class:noHover={device.longpress}>
							{#if device.loading}
								<div class="loader" transition:fly={{ y: -50, duration: 100 }}>
									<Loader color="gray" size={35} />
								</div>
							{:else if device.longpress}
								<div class="quickButtons" transition:fly={{ y: -50, duration: 100 }}>
									{#each quickButtons as button}
										<Button
											class="unstyledButton"
											on:click={async () => {
												try {
													setTimeout(() => {
														device.longpress = false;
													}, 100);
													await button.action(device);
													device.longpress = false;
												} catch (e) {
													alert(e);
												}
											}}
											override={{
												padding: '5px 10px'
											}}
											variant="subtle"
											color={button.color}
										>
											<Fa icon={button.icon} size="1.50x" color={button.color} />
										</Button>
									{/each}
								</div>
							{:else}
								<div style="height: 100%" transition:fly={{ y: 50, duration: 100 }}>
									<Flex
										override={{
											justifyContent: 'space-between',
											alignItems: 'center',
											height: '100%'
										}}
									>
										<Flex
											override={{
												alignItems: 'center',
												gap: '10px'
											}}
										>
											<Fa icon={faPersonBiking} size="1.5x" />
											<div>
												{device.name}
												<Text color={statusFormatter(device.status).color}>
													{statusFormatter(device.status).status}
												</Text>
											</div>
										</Flex>
										<Fa icon={faChevronRight} size="1.5x" />
									</Flex>
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<UnstyledButton
				on:click={() => {
					addDevice();
				}}
			>
				<div class="noDevices">
					<h1>No devices found</h1>
					<p>Click the button below to add a device</p>
					<Button ripple>
						<Flex
							override={{
								alignItems: 'center',
								justifyContent: 'center',
								gap: '10px',
								color: '#c4dbff'
							}}
						>
							<div class="plusIcon">
								<Fa icon={faPlus} size="1.3x" />
							</div>
							Add device</Flex
						></Button
					>
				</div>
			</UnstyledButton>
		{/if}
	</div>
</main>

<style>
	.bluetoothDevicesContainer {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
		width: 100%;
		grid-gap: 10px;
	}

	.bluetoothDeviceContainer:hover {
		transition: transform 0.1s;
	}
	.bluetoothDeviceContainer:active {
		background-color: rgb(50, 50, 50);
		transform: scale(0.95);
	}
	.bluetoothDeviceContainer {
		background-color: rgb(40, 40, 40);
		display: grid;
		grid-template-columns: 1fr auto;
		/* center */
		align-items: center;
		justify-content: center;
		padding: 20px;

		border-radius: 15px;
	}
	.bluetoothDevice {
		height: 30px;
		display: flex;
		color: white;
	}
	.bluetoothIcon {
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bluetoothDeviceDetails {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
	.bluetoothDeviceDetails > * {
		margin: 0px 0;
	}
	.bluetoothDeviceDetails p {
		font-size: 0.8rem;
		color: #c4dbff;
	}
	.plusIcon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	main {
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}
	.affix {
		position: fixed;
		bottom: 80px;
		right: 20px;
	}
	.deviceGrid {
		display: grid;
		/* automatically create grid  */
		grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
		width: 100%;
		max-width: 100vw;
		margin: 0 15px;
		grid-gap: 20px;
	}
	.deviceContainer {
		background-color: rgb(40, 40, 40);
		border-radius: 15px;
		padding: 20px;
		height: 40px;
		user-select: none;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.deviceContainer > * {
		/* set all to row 1 column 1 */
		grid-row: 1;
		grid-column: 1;
	}

	.deviceContainer {
		transition: transform 0.2s;
	}

	.deviceContainer:active {
		background-color: rgb(50, 50, 50);
		transform: scale(0.95);
	}
	.deviceContainer.noHover:active {
		background-color: rgb(40, 40, 40);
		transform: scale(1);
	}

	.devicesContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.noDevices {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		/* add border */
		border: 1px solid #212121;
		border-radius: 15px;
		padding: 20px;
	}
	.noDevices > * {
		margin: 10px 0;
	}
	.quickButtons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}
	button.unstyledButton {
		background-color: transparent;
		border: none;
		padding: 0;
		color: white;
		/* remove the font size */
		font-size: inherit;
		/* remove the align to center */
		text-align: left;
	}
	.loader {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
