<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '@svelteuidev/composables';
	import { Button, Flex, Loader } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	export let deviceId;
	import * as iconsBrands from '@fortawesome/free-brands-svg-icons';
	import * as icons from '@fortawesome/free-solid-svg-icons';

	function getIcon(value) {
		let icon = icons[value] || iconsBrands[value];
		return icon;
	}
	let layout = [
		{
			label: 'SD Card Automations',
			items: [],
			loading: true
		},
		{
			label: 'Core Automations',
			disclaimer: 'Not editable',
			items: [],
			loading: true
		}
	];
	let nameing = {
		nodes: {
			format(node) {
				// return 1 node or if it higher than 1 x nodes
				switch (node) {
					case 1:
						return '1 node';
					default:
						return `${node} nodes`;
				}
			}
		},
		actions: {
			format(actions) {
				// return 1 trigger or if it higher than 1 x triggers
				switch (actions) {
					case 1:
						return '1 trigger';
					default:
						return `${actions} triggers`;
				}
			}
		}
	};
	let device = 'loading';
	onMount(async () => {
		// wait 5 ms
		await new Promise((resolve) => setTimeout(resolve, 1));
		device = $devices.list.find((device) => device.id === deviceId);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === deviceId);
		});
		if (device?.flows?.sd || device?.flows?.core) {
			layout[0].items = device.flows?.sd || [];
			layout[1].items = device.flows?.core || [];
		}
		let flows = await device[device?.connectedTo].syncFlows();
		layout[0].items = flows.sd;
		layout[1].items = flows.core;
		layout[0].loading = false;
		layout[1].loading = false;
	});
</script>

<main>
	<div class="affix">
		<Button
			ripple
			override={{
				overflow: 'hidden'
			}}
			on:click={() => {}}
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
				Create Flow</Flex
			></Button
		>
	</div>
	{#each layout as group}
		<h2>
			{group.label}
			{#if group.disclaimer}
				<span>({group.disclaimer})</span>
			{/if}
		</h2>
		{#if group.loading && group.items.length === 0}
			<div class="loader">
				<Loader color="gray" size={35} />
			</div>
		{:else if group.items.length === 0}
			<p class="empty">No automations found</p>
		{/if}

		{#each group.items as item}
			<button
				class="unstyledButton"
				on:click={async () => {
					goto('/device/flow?id=' + item.id + '&device=' + deviceId);
				}}
				override={{
					padding: '5px 10px'
				}}
			>
				<div class="item">
					<div class="icon">
						<Fa icon={getIcon(item.icon)} size={'1.6x'} color={'white'} />
					</div>
					<div class="info">
						<h3>
							{item.label}
							<span>
								{#if item.id}
									({item.id})
								{/if}
							</span>
						</h3>
						<p>{nameing.nodes.format(item.nodes)} • {nameing.actions.format(item.triggers)}</p>
					</div>
					<div class="editButton">
						{#if group.loading}
							<Loader color="gray" size={28} />
						{:else}
							<Fa icon={faEllipsis} size={'1.6x'} color={'white'} />
						{/if}
					</div>
				</div>
			</button>
		{/each}
	{/each}
</main>

<style>
	main {
		margin: 1rem;
	}
	h2 {
		font-size: 1rem;
		color: rgb(218, 218, 218);
		margin: 0;
	}
	h2 span {
		font-size: 0.75rem;
		color: rgb(156, 156, 156);
	}
	.item {
		display: flex;
		align-items: center;
		background-color: rgb(53, 53, 53);
		padding: 0.8rem;
		margin-top: 1rem;
		border-radius: 15px;
	}
	.icon {
		width: 50px;
		height: 50px;
		background-color: #4e4e4e;
		border-radius: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.info {
		margin-left: 1rem;
	}
	.info h3 {
		font-size: 1.2rem;
		color: white;
		margin: 0;
	}
	.info h3 span {
		font-size: 0.8rem;
		color: rgb(156, 156, 156);
	}
	.info p {
		font-size: 1rem;
		color: rgb(218, 218, 218);
		margin: 0;
	}
	.editButton {
		margin-left: auto;
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
		transition: transform 0.1s;
		width: 100%;
		user-select: none;
	}
	p.empty {
		margin: 0 auto;
		width: fit-content;
		padding: 1rem 0;
		margin-bottom: 1rem;
		color: rgb(156, 156, 156);
	}
	/* add scale  */
	button.unstyledButton:active {
		transform: scale(0.95);
	}
	.affix {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.5rem;
		margin-top: 0.5rem;
	}
</style>
