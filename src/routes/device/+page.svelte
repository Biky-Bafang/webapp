<script>
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices, selectedTab } from '$lib/stores';
	import { faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { NativeSelect, UnstyledButton } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import TinySlider from '../../components/TinySlider.svelte';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Control from '../../components/device/Control.svelte';
	import InputItems from '../../components/device/InputItems.svelte';
	import Display from '../../components/device/Display.svelte';
	import Flow from '../../components/device/Flow.svelte';
	import { io } from '@svelteuidev/composables';
	let id;
	let device = 'loading';
	let index = 0;
	let selectedIndex = $selectedTab || 0;
	let loaded = false;
	let deviceTabs = {
		DISPLAY: {
			fullscreen: true,
			component: Display
		},
		FLOWS: {
			component: Flow
		},
		GENERAL: {
			component: InputItems,
			hex: 0x01,
			settings: [
				{
					label: 'Low Battery Protection',
					value: '--V',
					prefix: '',
					suffix: 'V',
					byteIndex: 2
				},
				{
					label: 'Current Limit',
					value: '--A',
					prefix: '',
					suffix: 'A',
					byteIndex: 3
				},
				{
					label: 'Speed Meter Type',
					value: '--',
					byteIndex: 25,
					// make an switch case from with hex value
					options(byte) {
						switch (byte) {
							case 0x00:
								return 'External';
							case 0x01:
								return 'Internal';
							case 0x10:
								return 'Motor Phase';
							default:
								return 'Unkown??';
						}
					}
				},
				{
					label: 'Wheel Diameter',
					value: '-- inch',
					byteIndex: 24,
					options(byte) {
						switch (byte) {
							case 0x1f:
							case 0x20:
								return '16 inch';
							case 0x21:
							case 0x22:
								return '17 inch';
							case 0x23:
							case 0x24:
								return '18 inch';
							case 0x25:
							case 0x26:
								return '19 inch';
							case 0x27:
							case 0x28:
								return '20 inch';
							case 0x29:
							case 0x2a:
								return '21 inch';
							case 0x2b:
							case 0x2c:
								return '22 inch';
							case 0x2d:
							case 0x2e:
								return '23 inch';
							case 0x2f:
							case 0x30:
								return '24 inch';
							case 0x31:
							case 0x32:
								return '25 inch';
							case 0x33:
							case 0x34:
								return '26 inch';
							case 0x35:
							case 0x36:
								return '27 inch';
							case 0x37:
								return '700C inch'; // Note: "700C" is a standard wheel size, not typically expressed in inches directly.
							case 0x38:
								return '28 inch';
							case 0x39:
							case 0x3a:
								return '29 inch';
							case 0x3b:
							case 0x3c:
								return '30 inch';
							default:
								return 'Unknown??';
						}
					}
				}
			],
			bottomComponent: Control
		},
		LEVELS: {
			hex: 0x02,
			component: InputItems,
			bottomComponent: Control
		},
		PEDAL: {
			hex: 0x03,
			component: InputItems,
			bottomComponent: Control,
			settings: [
				{
					label: 'Pedal Sensor Type',
					value: 'DoubleSignal-24'
				},
				{
					label: 'Designated Assist Level',
					value: 'By Display Command'
				},
				{
					label: 'Speed Limit',
					value: 'By Display Command'
				},
				{
					label: 'Start Current',
					value: '20%'
				},
				{
					label: 'Slow Start Mode',
					value: '4'
				},
				{
					label: 'Work Mode',
					value: 'Undetermined'
				},
				{
					label: 'Current Decay',
					value: '5'
				},
				{
					label: 'Stop Decay',
					value: '10ms'
				},
				{
					label: 'Keep Current',
					value: '60%'
				}
			]
		},
		THROTTLE: {
			hex: 0x04,
			component: InputItems,
			bottomComponent: Control,
			settings: [
				{
					label: 'Start Voltage',
					value: '1.1V'
				},
				{
					label: 'End Voltage',
					value: '4.2V'
				},
				{
					label: 'Mode',
					value: 'Speed'
				},
				{
					label: 'Designated Assist Level',
					value: 'By Display Command'
				},
				{
					label: 'Speed Limit',
					value: 'By Display Command'
				},
				{
					label: 'Start Current',
					value: '10%'
				}
			]
		}
	};
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
		// goto('/');
	}
	let width;
	let height;
	onMount(() => {
		id = $page.url.searchParams.get('id');
		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});
		// set loaded to true after 50ms
		setTimeout(() => {
			loaded = true;
		}, 50);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="header">
	<UnstyledButton
		on:click={() => {
			goto('/');
		}}
	>
		<Fa icon={faPlus} rotate={45} size="1.3x" />
	</UnstyledButton>
	<p>
		{device?.name}
	</p>
	<UnstyledButton
		on:click={() => {
			goto('/device/settings?id=' + id);
		}}
	>
		<Fa icon={faGear} rotate={45} size="1.3x" />
	</UnstyledButton>
</div>
<div class="selectorContainer">
	<TinySlider let:setIndex on:change={() => {}}>
		{#each Object.keys(deviceTabs) as tab, i}
			<div
				class="tab"
				class:active={i === selectedIndex}
				aria-hidden
				use:io={{ threshold: 1 }}
				on:change={() => {
					// if it is the selected tab set the index
					if (i === selectedIndex && !loaded) {
						setIndex(i - 1 < 0 ? 0 : i - 1);
					}
				}}
				on:click={() => {
					selectedIndex = i;
					$selectedTab = i;
					setIndex(i - 1 < 0 ? 0 : i - 1);
				}}
			>
				{tab}
			</div>
		{/each}
	</TinySlider>
</div>
<div
	class="tabContent"
	class:fullscreen={deviceTabs[Object.keys(deviceTabs)[selectedIndex]]?.fullscreen}
>
	<div class="transition tabContainer">
		{#key selectedIndex}
			<div>
				{#if deviceTabs[Object.keys(deviceTabs)[selectedIndex]]}
					<svelte:component
						this={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].component}
						inputs={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].settings}
						deviceId={device.id}
					/>
				{/if}
			</div>
		{/key}
	</div>
	{#if deviceTabs[Object.keys(deviceTabs)[selectedIndex]]}
		<div class="bottomContainer">
			<svelte:component
				this={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].bottomComponent}
				title={Object.keys(deviceTabs)[selectedIndex]}
				deviceId={id}
				{device}
				hex={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].hex}
				on:read={(e) => {
					let response = e.detail;
					// response.message is a Uint8Array but in string, but it has 0x in front of each byte
					// so we need to remove it. So first we convert the string to an array of strings. And then we convert each byte to an integer
					response.message = response.message
						.split(' ')
						.splice(1)
						.map((byte) => {
							// then we remove the 0x from each byte
							return byte.replace('0x', '');
						});
					// set the settings with the byteIndex so byte 2 goes to the first setting
					deviceTabs[Object.keys(deviceTabs)[selectedIndex]].settings.forEach((setting, i) => {
						if (!setting.byteIndex) return;
						if (setting.options) {
							setting.value = setting.options(parseInt(response.message[setting.byteIndex], 16));
							return;
						} else {
							setting.value =
								setting.prefix + parseInt(response.message[setting.byteIndex], 16) + setting.suffix;
						}
					});
					deviceTabs = deviceTabs;
				}}
			/>
		</div>
	{/if}
</div>

<style>
	.transition {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.transition > * {
		grid-column: 1;
		grid-row: 1;
	}
	.tabContent {
		min-height: calc(100vh - 95px);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
	}
	.fullscreen {
		min-height: 100vh;
	}
	.tab {
		padding: 5px 10px;
		/* set width in px */
		width: calc(100vw / 4 - 20px);
		text-align: center;
		/* offset it */
	}
	.tab.active::after {
		/* set in the middle a 100px line */
		content: '';
		display: block;
		height: 2px;
		background: #909090;
		width: 70px;
		margin: 0 auto;
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
