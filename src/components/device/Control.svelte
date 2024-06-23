<script>
	import { readController } from '$lib/general';
	import { Button, Loader } from '@svelteuidev/core';
	import { createEventDispatcher } from 'svelte';
	export let title;
	export let hex;
	export let deviceId;
	const dispatch = createEventDispatcher();
	let read = {
		loading: false
	};
	let write = {
		loading: false
	};
</script>

<main>
	<div class="controllerContainer">
		<Button
			variant="outline"
			color="green"
			on:click={async () => {
				read.loading = true;
				try {
					let response = await readController(deviceId, hex);
					dispatch('read', response);
				} catch (e) {
					alert(e);
				}
				read.loading = false;
			}}
			override={{
				width: '80px'
			}}
		>
			{#if read.loading}
				<Loader color="gray" size={20} />
			{:else}
				Read
			{/if}
		</Button>
		<h3 class="name">
			{title || ''}
		</h3>
		<Button
			override={{
				width: '80px'
			}}
			variant="outline"
			color="red">Write</Button
		>
	</div>
</main>

<style>
	.controllerContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 20px;
		border-top: 1px solid #515151;
	}
	.name {
		margin: 0;
	}
</style>
