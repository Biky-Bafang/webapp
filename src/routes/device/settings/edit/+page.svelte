<script>
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { devices } from '$lib/stores';
	import { faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
	import {
		Button,
		Input,
		InputWrapper,
		Loader,
		NativeSelect,
		TextInput,
		UnstyledButton
	} from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import { BleClient } from '@capacitor-community/bluetooth-le';
	import { characteristicUuid, serviceUuid } from '$lib/general';
	let id;
	let name;
	let value;
	let hex;
	let loading = false;
	let device = 'loading';
	let type = 'text';
	let options = [];
	$: if ((!device || device?.status !== 'connected') && browser && device !== 'loading') {
		goto('/');
	}
	onMount(async () => {
		id = $page.url.searchParams.get('id');
		value = $page.url.searchParams.get('value');
		hex = $page.url.searchParams.get('hex');
		name = $page.url.searchParams.get('name');
		type = $page.url.searchParams.get('type') || 'text';
		options = $page.url.searchParams.get('options')?.split(',') || [];

		device = $devices.list.find((device) => device.id === id);
		devices.subscribe((value) => {
			device = value.list.find((device) => device.id === id);
		});
		// make inputText focus
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 200);
		});
		document.getElementById('inputText').focus();
	});
</script>

<div class="header">
	<UnstyledButton
		on:click={() => {
			window.history.back();
		}}
	>
		<Fa icon={faPlus} rotate={45} size="1.3x" />
	</UnstyledButton>
	<p>
		{device?.name}
	</p>
	<Button
		color="gray"
		variant="subtle"
		on:click={async () => {
			try {
				loading = true;
				// check if its a select or input
				if (options.length > 0) {
					// send it as a hex value. So first convert to hex as int
					value = parseInt(value);
					await BleClient.write(
						device.id,
						serviceUuid,
						characteristicUuid,
						new Uint8Array([0xf2, hex, value])
					);
				} else {
					await BleClient.write(
						device.id,
						serviceUuid,
						characteristicUuid,
						// send value as ascii hex so 2 hex characters per character
						new Uint8Array([0xf2, hex, ...value.split('').map((char) => char.charCodeAt(0))])
					);
				}
				await device[device.connectedTo].sync();
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, 200);
				});
				loading = false;
				window.history.back();
			} catch (e) {
				alert(e.message);
			}
		}}
	>
		{#if loading}
			<Loader color="gray" size="20" />
		{:else}
			Save
		{/if}
	</Button>
</div>
<div class="inputContainer">
	{#if options.length > 0}
		<NativeSelect
			override={{
				// set background to dark gray
				'& > select': {
					background: '#4c4d4e',
					height: '40px',
					borderRadius: '5px 5px 0 0',
					borderBottom: '3px solid #88f',
					display: 'flex',
					alignItems: 'center',
					color: '#fff !important',
					color: '#fff !important'
				}
			}}
			data={options}
			placeholder={value}
			label={name}
			bind:value
		/>
	{:else}
		<InputWrapper label={name}>
			<TextInput
				variant="unstyled"
				id="inputText"
				override={{
					// set background to dark gray
					background: '#4c4d4e',
					height: '40px',
					borderRadius: '5px 5px 0 0',
					borderBottom: '3px solid #88f',
					display: 'flex',
					alignItems: 'center',
					color: '#fff !important',
					'& > input': {
						color: '#fff !important'
					}
				}}
				bind:value
			/>
		</InputWrapper>
	{/if}
</div>

<style>
	.inputContainer {
		padding: 20px;
	}
	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		/* center verticallty */
		align-items: center;
		gap: 20px;
		padding: 10px;
		background: #3069a1;
	}
	.header p {
		margin: 0;
		font-size: 1.25rem;
	}
</style>
