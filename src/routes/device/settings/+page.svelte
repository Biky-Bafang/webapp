<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import {
		faChevronLeft,
		faLinkSlash,
		faRotateLeft,
		faSpinner,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { Divider, UnstyledButton, Button, Loader } from '@svelteuidev/core';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { BleClient } from '@capacitor-community/bluetooth-le';
	import {
		characteristicUuid,
		connectDevice,
		factoryReset,
		rebootDevice,
		serviceUuid,
		syncDevice
	} from '$lib/general';
	let id;
	let device = 'loading';
	let interval;
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
		// return if rebooting
		if (!settingsItems?.[4]?.loading) {
			goto('/');
		}
	}
	let settingsItems = [
		{
			type: 'loading'
		}
	];
	let updateSettings = async (device = {}) => {
		device = await device[device.connectedTo]?.sync();

		settingsItems = [
			{
				type: 'input',
				label: 'Name',
				hex: 0x01,
				value: device.name
			},
			{
				type: 'input',
				label: 'Serial Packet Delay',
				hex: 0x03,
				options: [
					'1 ms',
					'2 ms',
					'3 ms',
					'4 ms',
					'5 ms',
					'10 ms',
					'15 ms',
					'20 ms',
					'25 ms',
					'30 ms',
					'35 ms',
					'40 ms',
					'45 ms',
					'50 ms',
					'60 ms',
					'70 ms',
					'80 ms',
					'90 ms',
					'100 ms'
				],
				value: device?.packetDelay + ' ms'
			},
			{
				type: 'input',
				label: 'BLE Tx Power Level',
				hex: 0x04,
				options: ['3 dBm', '6 dBm', '9 dBm', '12 dBm', '15 dBm', '18 dBm', '21 dBm'],
				value: device?.txPower + ' dBm'
			},
			{
				type: 'input',
				label: 'Serial1 RX TX invert',
				hex: 0x05,
				options: [true, false],
				value: device?.invertSerial1
			},
			{
				type: 'input',
				label: 'Serial2 RX TX invert',
				hex: 0x06,
				options: [true, false],
				value: device?.invertSerial2
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				label: 'Reboot device',
				color: '#f78385',
				icon: faRotateLeft,
				on: {
					click: async () => {
						try {
							// set self button to loading
							settingsItems[4].loading = true;
							await device[device.connectedTo].reboot();
							await device[device.connectedTo].sync();
							settingsItems[4].loading = false;
						} catch (e) {
							alert(e);
						}
					}
				}
			},
			{
				type: 'button',
				label: 'Factory reset',
				color: '#f78385',
				icon: faLinkSlash,
				on: {
					click: async () => {
						try {
							settingsItems[5].loading = true;
							await factoryReset(device.id);
							await new Promise((resolve) => {
								setTimeout(() => {
									resolve();
								}, 500);
							});
							settingsItems[5].loading = false;
							settingsItems[4].loading = true;
							await device[device.connectedTo].reboot();
							await device[device.connectedTo].sync();
						} catch (e) {
							alert(e);
						}
					}
				}
			},
			{
				type: 'button',
				label: `Remove device`,
				color: '#f78385',
				icon: faTrash,
				on: {
					click: () => {
						// delete device
						devices.update((value) => {
							return value.filter((device) => device.id !== id);
						});
						goto('/');
					}
				}
			},
			{
				type: 'divider'
			},
			{
				type: 'text',
				textItems: [
					`Mac: ${device?.id}`,
					'Firmware: 1.0.0',
					`Hardware: 1.0.0`,
					`Status: ${device?.status}`,
					`SD Card: ${device?.sdCard ? 'Inserted' : 'Not inserted'}`
				]
			}
		];
	};
	onMount(async () => {
		id = $page.url.searchParams.get('id');
		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});

		settingsItems = [
			{
				type: 'loading'
			}
		];
		// sync every 5 second
		updateSettings(device);
		interval = setInterval(async () => {
			updateSettings(device);
		}, 750);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<main>
	<div class="header">
		<UnstyledButton
			on:click={() => {
				// go back
				history.back();
			}}
		>
			<Fa icon={faChevronLeft} size="1.2x" />
		</UnstyledButton>
		<p>
			Settings for {device?.name}
		</p>
	</div>
	{#if settingsItems[0].type == 'loading'}
		<div class="loader">
			<Loader color="gray" />
		</div>
	{/if}
	<div class="settingsContainer">
		{#each settingsItems as item}
			{#if item.type === 'input'}
				<Button
					ripple
					override={{
						background: 'transparent !important',
						color: 'inherit',
						padding: '5px',
						margin: '0',
						height: '100%',
						width: '100%',
						justifyContent: 'flex-start',
						textAlign: 'left',
						'&:hover': {
							background: 'transparent'
						}
					}}
					on:click={() => {
						if (item.readOnly) return;

						// go to /edit?name={item.label}&value={item.value}&hex={item.hex}
						goto(
							`/device/settings/edit?id=${id}&name=${item.label}&value=${item.value}&hex=${item.hex}${item.options ? '&options=' + item.options : ''}`
						);
					}}
				>
					<div class="inputContainer">
						<label>{item.label}</label>
						<p>
							{item.value}
						</p>
					</div>
				</Button>
			{:else if item.type === 'divider'}
				<Divider color="grey" />
			{:else if item.type === 'button'}
				<div class="buttonContainer">
					<Button
						ripple
						override={{
							background: 'transparent !important',
							color: item.color ? item.color : 'inherit',
							padding: '5px',
							margin: '0',
							height: '100%',
							width: '100%',
							justifyContent: 'flex-start',
							textAlign: 'left',
							gap: '10px',
							'&:hover': {
								background: 'transparent'
							}
						}}
						on:click={item.on.click}
					>
						{#if item.loading}
							<Fa icon={faSpinner} pulse size="1.2x" />
						{:else}
							<Fa icon={item.icon} size="1.2x" />
						{/if}
						{item.label}
						{#if item.information}
							<span class="info">
								({item.information})
							</span>
						{/if}
					</Button>
				</div>
			{:else if item.type === 'text'}
				<div class="textContainer">
					{#each item.textItems as textItem}
						<p>
							{textItem}
						</p>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</main>

<style>
	.info {
		font-size: 0.7rem;
		color: rgb(202, 202, 202);
		font-weight: bold;
	}
	.textContainer {
		display: grid;
		gap: 10px;
	}
	.textContainer p {
		font-size: 0.8rem;
		color: rgb(202, 202, 202);
		/* change lines height */
		line-height: 0.38;
		margin: 0;
	}
	.inputContainer label {
		font-size: 1rem;
		font-weight: bold;
		margin: 0;
	}
	.inputContainer p {
		font-size: 0.8rem;
		color: rgb(202, 202, 202);
		padding: 0;
		margin: 0;
		margin-top: 5px;
	}
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.settingsContainer {
		padding: 15px;
		gap: 5px;
		display: grid;
	}
	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		/* center verticallty */
		align-items: center;
		gap: 20px;
		padding: 20px;
		/* background: #1c1d1e; */
	}
	.header p {
		margin: 0;
		font-size: 1.25rem;
	}
</style>
