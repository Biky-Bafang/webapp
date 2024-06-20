<script>
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
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
	let id;
	let device = 'loading';
	let index = 0;
	let selectedIndex = 0;
	let deviceTabs = {
		DISPLAY: {
			fullscreen: true
		},
		FLOWS: {},
		GENERAL: {
			component: InputItems,
			hex: 0x01,
			settings: [
				{
					label: 'Low Battery Protection',
					value: '40V'
				},
				{
					label: 'Current Limit',
					value: '24A'
				},
				{
					label: 'Speed Limit Type',
					value: 'External, Wheel Meter'
				},
				{
					label: 'Speed Meter Signals',
					value: '1'
				},
				{
					label: 'Wheel Diameter',
					value: '26 inch'
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
		goto('/');
	}
	let width;
	let height;
	onMount(() => {
		id = $page.url.searchParams.get('id');
		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});
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
	<TinySlider let:setIndex on:change={() => alert('test')}>
		{#each Object.keys(deviceTabs) as tab, i}
			<div
				class="tab"
				class:active={i === selectedIndex}
				aria-hidden
				on:click={() => {
					selectedIndex = i;
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
				hex={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].hex}
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
