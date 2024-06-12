<script>
	import { goto, onNavigate } from '$app/navigation';
	import { devices } from '$lib/stores';
	import { faChevronRight, faPersonBiking, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { Affix, Button, Flex, Text, UnstyledButton, Loader } from '@svelteuidev/core';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
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
	let accumulatedData = '';
	async function addDevice() {
		if (typeof navigator?.bluetooth === 'undefined') {
			console.log('Bluetooth not supported');
			return;
		}
		let device = await navigator.bluetooth.requestDevice({
			filters: [
				{
					namePrefix: 'Biky'
				},
				{
					services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
				}
			]
		});
		$devices = [...$devices, { name: device.name, id: device.id, self: device }];
	}
	function hex2a(hexx) {
		var hex = hexx.toString(); //force conversion
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}
	function handleCharacteristicValueChanged(event, device) {
		let value = event.target.value;
		let chunk = new TextDecoder().decode(value);
		if (chunk.startsWith('ff')) {
			accumulatedData = '';
			chunk = chunk.slice(2);
		} else if (accumulatedData.length <= 0) {
			return;
		}
		chunk = hex2a(chunk);

		console.log('Received chunk:', chunk);
		accumulatedData += chunk;

		// Assuming the transmission ends when a specific delimiter is found, e.g., "\n"
		if (chunk.endsWith('}')) {
			processData(accumulatedData, device);
			accumulatedData = ''; // Reset for the next message
		}
	}

	function processData(data, device) {
		try {
			let jsonData = JSON.parse(data);
			console.log('Received JSON:', jsonData);

			// set device data to the parsed JSON
			devices.set($devices.map((d) => (d.id === device.id ? { ...d, data: jsonData } : d)));
		} catch (error) {
			console.log('Error parsing JSON:', error);
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<svelte:window on:scroll={() => (scrollY = window.scrollY)} />
<main>
	<div class="devicesContainer">
		{#if $devices.length > 0}
			<Affix position={{ bottom: 20, right: 20 }}
				><Button
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
			</Affix>
			<div class="deviceGrid">
				{#each $devices as device}
					<UnstyledButton
						override={{
							height: '100%'
						}}
						on:click={async () => {
							device.loading = true;
							try {
								const server = await device.self.gatt.connect();
								const service = await server.getPrimaryService(serviceUuid);
								const characteristic = await service.getCharacteristic(characteristicUuid);
								await characteristic.startNotifications();
								await characteristic.writeValue(new Uint8Array([0x1]));
								characteristic.addEventListener('characteristicvaluechanged', (event) =>
									handleCharacteristicValueChanged(event, device)
								);
								// wait for device.data to be set
								console.log('Notifications have been started.');
							} catch (error) {
								console.error(error);
								// get reason
								console.log(error.reason);
								device.loading = false;
								device.status = 'Failed to connect';
								return;
							}

							device.loading = false;
							device.status = 'connected';
							goto(`/device/${encodeURIComponent(device.id)}`);
						}}
					>
						<div class="deviceContainer" class:deviceHover={device.hover}>
							{#if device.loading}
								<Flex
									override={{
										justifyContent: 'space-between',
										alignItems: 'center',
										height: '100%',
										width: '100%',
										'& > *': {
											margin: `0 auto`
										}
									}}
								>
									<Loader color="gray" size={36} />
								</Flex>
							{:else}
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
							{/if}
						</div>
					</UnstyledButton>
				{/each}
			</div>
		{:else}
			<UnstyledButton
				on:click={() => {
					console.log('add device');
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
	main {
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
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
	}

	.deviceContainer:hover {
		transition: transform 0.2s;
	}

	.deviceContainer:active {
		background-color: rgb(50, 50, 50);
		transform: scale(0.95);
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
</style>
