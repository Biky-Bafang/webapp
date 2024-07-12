<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faChevronLeft, faGear } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '@svelteuidev/composables';

	import { UnstyledButton } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	let device = 'loading';
	let id;
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
		goto('/');
	}
	onMount(() => {
		id = $page.url.searchParams.get('id');
		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});
	});
</script>

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
	<UnstyledButton
		on:click={() => {
			goto('/device/flow/settings?id=' + id);
		}}
	>
		<Fa icon={faGear} rotate={45} size="1.3x" />
	</UnstyledButton>
</div>

<style>
	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		/* center verticallty */
		align-items: center;
		gap: 20px;
		padding: 15px;
		background: #3069a1;
	}
	.header p {
		margin: 0;
		font-size: 1.25rem;
	}
</style>
