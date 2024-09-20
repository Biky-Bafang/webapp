<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '@svelteuidev/composables';
	import { Button, Flex, Input, Loader, Menu } from '@svelteuidev/core';
	import { onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	export let deviceId;
	import * as iconsBrands from '@fortawesome/free-brands-svg-icons';
	import * as icons from '@fortawesome/free-solid-svg-icons';
	import Modal from '../Modal.svelte';
	import { BleClient } from '@capacitor-community/bluetooth-le';
	import { characteristicUuid, serviceUuid } from '$lib/general';

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
		},
		{
			label: 'Global Variables',
			emptyLabel: 'No global variables found',
			items: [],
			type: 'variables',
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
	let interval;
	onMount(async () => {
		// wait 5 ms
		await new Promise((resolve) => setTimeout(resolve, 1));
		device = $devices.list.find((device) => device.id === deviceId);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === deviceId);
		});
		if (device?.flows?.sd || device?.flows?.core || device?.flows?.variables) {
			layout[0].items = device.flows?.sd || [];
			layout[1].items = device.flows?.core || [];
			layout[2].items = device.flows?.variables || [];
		}
		let flows = await device[device?.connectedTo].syncFlows();
		layout[0].items = flows.sd || [];
		layout[1].items = flows.core || [];
		layout[2].items = flows.variables || [];
		console.log(flows);
		layout[0].loading = false;
		layout[1].loading = false;
		layout[2].loading = false;
		// sync every 2 seconds
		interval = setInterval(async () => {
			let flows = await device[device?.connectedTo].syncFlows();
			layout[0].items = flows.sd || [];
			layout[1].items = flows.core || [];
			layout[2].items = flows.variables || [];
		}, 2000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
	let variableModal = false;
	let requestDeletion = {
		opened: false,
		on: {
			close: () => {},
			cancel: () => {},
			confirm: async () => {}
		},
		loading: false,
		type: 'variable'
	};
</script>

<Modal
	opened={requestDeletion.opened}
	title="?Are you sure"
	position="top"
	color="red"
	on:close={() => {
		requestDeletion.opened = false;
		requestDeletion.on.close();
		requestDeletion.loading = false;
	}}
>
	<Fa slot="icon" icon={icons.faExclamationTriangle} size="2x" />
	<p style="margin: 0 auto; text-align: center; width: 200px; margin-bottom: 15px;">
		Are you sure you want to delete this {requestDeletion.type}?
	</p>
	<Button
		slot="leftButton"
		override={{
			width: 'calc(50% - 0.5rem)'
		}}
		on:click={async () => {
			requestDeletion.loading = true;
			await requestDeletion.on.confirm();
			requestDeletion.opened = false;
			requestDeletion.loading = false;
		}}
		loading={requestDeletion.loading}
		color="red">Delete</Button
	>
	<Button
		slot="rightButton"
		override={{
			width: 'calc(50% - 0.5rem)'
		}}
		on:click={() => {
			requestDeletion.opened = false;
			requestDeletion.on.cancel();
			requestDeletion.loading = false;
		}}
		loading={requestDeletion.loading}
		color="gray">Cancel</Button
	>
</Modal>
<Modal
	title="Create Variable"
	position="top"
	color="green"
	opened={variableModal}
	on:close={() => (variableModal = false)}
>
	<p style="margin: 0 15px 15px 15px; text-align: center;">Create a new variable</p>
	<Input
		id="inputText"
		label="Name"
		placeholder="Variable name"
		override={{
			marginBottom: '15px'
		}}
		maxlength="9"
		on:click={() => {
			document.getElementById('inputText').focus();
		}}
	/>
	<Fa slot="icon" icon={icons.faCode} size="2x" />
	<Button
		slot="leftButton"
		color="green"
		on:click={async () => {
			let inputText = document.getElementById('inputText').value.toUpperCase();
			await BleClient.write(
				device.id,
				serviceUuid,
				characteristicUuid,
				new Uint8Array([0xf5, 0x01, ...inputText.split('').map((char) => char.charCodeAt(0))])
			);
			variableModal = false;
			// reload the flows
			let flows = await device[device?.connectedTo].syncFlows();
			layout[0].items = flows.sd || [];
			layout[1].items = flows.core || [];
			layout[2].items = flows.variables || [];
			layout[0].loading = false;
			layout[1].loading = false;
			layout[2].loading = false;
		}}
		override={{
			width: 'calc(50% - 0.5rem)'
		}}>Create Variable</Button
	>
	<Button
		slot="rightButton"
		color="gray"
		on:click={() => {
			variableModal = false;
		}}
		override={{
			width: 'calc(50% - 0.5rem)'
		}}>Cancel</Button
	>
</Modal>
<main>
	<div class="affix">
		<Button
			ripple
			override={{
				overflow: 'hidden'
			}}
			color="green"
			on:click={() => {
				variableModal = true;
			}}
		>
			<Flex
				override={{
					alignItems: 'center',
					justifyContent: 'center',
					gap: '10px',
					color: '#c4fff0'
				}}
			>
				<div class="plusIcon">
					<Fa icon={faPlus} size="1.3x" />
				</div>
				Variable</Flex
			></Button
		>
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
				Flow</Flex
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
			<p class="empty">
				{group.emptyLabel || 'No automations found'}
			</p>
		{/if}
		<div class:settingsGrid={group.type == 'variables'}>
			{#each group.items as item}
				{#if group.type == 'variables'}
					<button
						class="unstyledButton variables"
						on:click={async () => {
							requestDeletion = {
								...requestDeletion,
								opened: true,
								on: {
									async confirm() {
										await BleClient.write(
											device.id,
											serviceUuid,
											characteristicUuid,
											new Uint8Array([
												0xf5,
												0x02,
												...item.id.split('').map((char) => char.charCodeAt(0))
											])
										);
										let flows = await device[device?.connectedTo].syncFlows();
										layout[0].items = flows.sd || [];
										layout[1].items = flows.core || [];
										layout[2].items = flows.variables || [];
									}
								}
							};
						}}
						override={{
							padding: '5px 10px'
						}}
					>
						<div class="item variables">
							<div class="info">
								<h3>
									{item.id || 'Unkown'}
								</h3>
								<p>{item.value || '0'}</p>
							</div>
							<div class="editButton top">
								{#if group.loading}
									<Loader color="gray" size={16} />
								{:else}
									<Fa icon={icons.faTrash} size={'1x'} color={'#ff4b4a'} />
								{/if}
							</div>
						</div>
					</button>
				{:else}
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
				{/if}
			{/each}
		</div>
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
	.editButton.top {
		margin-top: -1.5rem;
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
		margin-bottom: 1rem;
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
		display: flex;
		gap: 1rem;
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
	button.variables {
		margin: 0;
	}
	.item.variables {
		margin: 0;
	}
	.item.variables .info {
		margin-left: 0;
	}
	.settingsGrid {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
		/* auto grid  that is 3 wide*/
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
</style>
