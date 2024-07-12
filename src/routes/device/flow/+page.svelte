<script>
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faChevronLeft, faGear, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '@svelteuidev/composables';

	import { Button, UnstyledButton } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import XyFlow from '../../../components/device/XyFlow.svelte';
	import Modal from '../../../components/Modal.svelte';

	let device = 'loading';
	let id;
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
	}
	onMount(() => {
		id = $page.url.searchParams.get('device');
		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});
	});
	beforeNavigate((navigation) => {
		cancel();
	});
	let flow = {
		name: 'test'
	};
</script>

<Modal opened title="Unsaved Changes" position="top" color="red">
	<p style="margin: 0 15px 15px 15px; text-align: center;">
		You are about to lose your changes. Are you sure you want to continue?
	</p>
	<Fa slot="icon" icon={faTriangleExclamation} size="2x" />
	<Button
		slot="leftButton"
		color="red"
		override={{
			width: 'calc(50% - 0.5rem)'
		}}>Lose Changes</Button
	>
	<Button
		slot="rightButton"
		color="gray"
		override={{
			width: 'calc(50% - 0.5rem)'
		}}>Cancel</Button
	>
</Modal>
<div class="header">
	<UnstyledButton
		on:click={() => {
			// go back
			goto('/device?id=' + device.id);
		}}
	>
		<Fa icon={faChevronLeft} size="1.2x" />
	</UnstyledButton>
	<p>
		Flow {JSON.stringify(flow)}
	</p>
	<UnstyledButton
		on:click={() => {
			goto('/device/flow/settings?id=' + id);
		}}
	>
		<Fa icon={faGear} rotate={45} size="1.3x" />
	</UnstyledButton>
</div>
<div class="flowContainer">
	<XyFlow />
</div>

<style>
	.flowContainer {
		width: 100%;
		height: 100%;
	}
	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		/* center verticallty */
		align-items: center;
		gap: 20px;
		padding: 15px;
		/* background: #1c1d1e; */
	}
	.header p {
		margin: 0;
		font-size: 1.25rem;
	}
</style>
