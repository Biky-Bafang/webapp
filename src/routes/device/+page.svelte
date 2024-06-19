<script>
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { UnstyledButton } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { TinySlider } from 'svelte-tiny-slider';
	import Fa from 'svelte-fa';
	import General from '../../components/device/General.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Control from '../../components/device/Control.svelte';
	import { currentIndex } from 'svelte-tiny-slider/src/TinySlider.svelte';
	let id;
	let device = 'loading';
	let index = 0;
	let selectedIndex = 0;
	let deviceTabs = {
		DISPLAY: {
			fullscreen: true
		},
		FLOWS: {
			component: General
		},
		GENERAL: {
			component: General,
			bottomComponent: Control
		},
		LEVELS: {
			component: General,
			bottomComponent: Control
		},
		PEDAL: {
			component: General,
			bottomComponent: Control
		},
		THROTTLE: {
			component: General,
			bottomComponent: Control
		}
	};
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
		goto('/');
	}
	let width;
	let height;
	onMount(() => {
		id = $page.url.searchParams.get('id');
		device = $devices.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.find((device) => device.id === id);
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
	<TinySlider let:setIndex bind:currentIndex={index} on:change={() => alert('test')}>
		{#each Object.keys(deviceTabs) as tab, i}
			<div
				class="tab"
				class:active={i === selectedIndex}
				aria-hidden
				on:click={() => {
					alert('test');
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
			<div
				in:fly|local={{ duration: 350, x: width, easing: cubicOut }}
				out:fly|local={{ duration: 350, x: -width, easing: cubicOut }}
			>
				{#if deviceTabs[Object.keys(deviceTabs)[selectedIndex]]}
					<svelte:component this={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].component} />
				{/if}
			</div>
		{/key}
	</div>
	{#if deviceTabs[Object.keys(deviceTabs)[selectedIndex]]}
		<div class="bottomContainer">
			<svelte:component
				this={deviceTabs[Object.keys(deviceTabs)[selectedIndex]].bottomComponent}
				title={Object.keys(deviceTabs)[selectedIndex]}
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
