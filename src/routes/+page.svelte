<script>
	import { goto, onNavigate } from '$app/navigation';
	import { devices, modal, selectedTab } from '$lib/stores';
	import {
		faChevronRight,
		faGear,
		faLinkSlash,
		faPersonBiking,
		faPlus,
		faTrash,
		faWifi
	} from '@fortawesome/free-solid-svg-icons';
	import {
		Affix,
		Button,
		Flex,
		Text,
		UnstyledButton,
		Loader,
		Card,
		TextInput
	} from '@svelteuidev/core';
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
	import Modal from '../components/Modal.svelte';
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
			action: async (device) => {
				await device.delete();
				return;
			}
		},
		{
			type: 'disconnect',
			icon: faLinkSlash,
			action: async (device) => {
				let type = device.connectedTo;
				device[type]?.disconnect();
				await new Promise((resolve) => setTimeout(resolve, 2));
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
			let type = await protocolModal.request();
			if (type === 'bluetooth') {
				let bluetoothEnabled = await BleClient.isEnabled();
				if (!bluetoothEnabled) {
					alert('Bluetooth is disabled');
					return;
				}
				getBLEDevices(5000);
				$modal.bluetooth = true;
			}
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
	let protocolModal = {
		opened: false,
		async request() {
			protocolModal.value = null;
			protocolModal.opened = true;
			while (protocolModal.opened) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
			return protocolModal.value;
		}
	};
	let protocols = [
		{
			name: 'Bluetooth',
			id: 'bluetooth',
			icon: faBluetoothB
		},
		{
			name: 'Wifi',
			id: 'wifi',
			icon: faWifi
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<svelte:window on:scroll={() => (scrollY = window.scrollY)} />
<main>
	<Modal
		opened={protocolModal.opened}
		title="Protocol"
		position="top"
		on:close={() => (protocolModal.opened = false)}
	>
		<div class="protocolContainer">
			{#each protocols as protocol}
				<UnstyledButton
					on:click={() => {
						protocolModal.opened = false;
						protocolModal.value = protocol.id;
					}}
				>
					<div class="protocol">
						<Fa icon={protocol.icon} size="1.5x" />
						<h3>{protocol.name}</h3>
					</div>
				</UnstyledButton>
			{/each}
		</div>

		<div class="Description"></div>
	</Modal>
	<Modal opened={$modal.wifi} title="WiFi" position="top">
		<TextInput label="IP Adress" />
		<div slot="leftButton">
			<Button
				override={{
					width: '200px'
				}}>Connect</Button
			>
		</div>
	</Modal>
	<DeviceModal
		title="Bluetooth"
		position="top"
		opened={$modal.bluetooth}
		on:close={() => {
			// stop scanning
			BleClient.stopLEScan();
			$modal.bluetooth = false;
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
						try {
							device.loading = true;
							await $devices.add(
								{
									id: device.id,
									name: device.name,
									status: 'connected'
								},
								'bluetooth'
							);
							$modal.bluetooth = false;
							device.loading = false;
							// goto(`/device?id=${encodeURIComponent(device.id)}`);
						} catch (error) {
							$modal.bluetooth = false;
							device.loading = false;
							alert(error.message);
						}
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
		{#if $devices.list?.length > 0}
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
						Add Device</Flex
					></Button
				>
			</div>
			<div class="deviceGrid">
				{#each $devices?.list as device}
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
							try {
								if (device.longpress) return;
								if (device.loading) return;
								let type = device.connectedTo;
								if (device.status !== 'connected' || !device.connectedTo) {
									type = await protocolModal.request();
									if (!type) return;
								}

								let connection = await device[type]?.connect();
								if (!connection) return;
								await new Promise((resolve) => setTimeout(resolve, 100));
								if (connection) await device[type].sync();
								device.status = 'connected';
								$selectedTab = 0;
								goto(`/device?id=${encodeURIComponent(device.id)}`);
							} catch (error) {
								alert(error.message);
							}
							device.loading = false;
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
	.protocolContainer {
		display: flex;
		justify-content: space-between;
		grid-gap: 10px;
		padding: 20px;
		/* align to bottom */
		align-items: flex-end;
	}
	.protocol {
		background-color: rgb(40, 40, 40);
		border-radius: 15px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* make them all the same width and height */
		width: 80px;
		height: 50px;
	}
	.protocol h3 {
		margin: 5px;
	}
	.protocol:hover {
		background-color: rgb(50, 50, 50);
		transition: transform 0.1s;
	}
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
