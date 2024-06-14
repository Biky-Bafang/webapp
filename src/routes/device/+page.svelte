<script>
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { UnstyledButton } from '@svelteuidev/core';
</script>

<UnstyledButton
	on:click={() => {
		goto('/');
	}}>Back</UnstyledButton
>
{#if $devices.find((device) => device.id === $page.params.id)}
	<!-- from [object DataView] parse as string -->
	<h1>
		{JSON.stringify($devices.find((device) => device.id === $page.params.id).data)}
	</h1>
{/if}

<style>
</style>
