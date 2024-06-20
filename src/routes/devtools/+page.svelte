<script>
	import { characteristicUuid, serviceUuid } from '$lib/general';
	import { consoleMessages, devices } from '$lib/stores';
	import { BleClient } from '@capacitor-community/bluetooth-le';
	import { Button, Flex, NativeSelect } from '@svelteuidev/core';
	// loop 20 times
	// every 1 sec add a new message
	let hexInput = ''; // should be 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 may be longer may be shorter.
	let delayInput = 10;
	let serialDelayInput = 2;
	let selectedDevice;
</script>

<main>
	<Flex
		override={{
			gap: '10px',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: '10px 0'
		}}
	>
		<Button
			color="gray"
			variant="subtle"
			on:click={() => {
				consoleMessages.set([]);
			}}>Clear</Button
		>
		<input
			type="number"
			class="delayInput"
			bind:value={delayInput}
			on:change={async () => {
				// send to the device 0x04 and then the delay in hex
				try {
					await BleClient.write(
						selectedDevice.id,
						serviceUuid,
						characteristicUuid,
						new Uint8Array([0x04, delayInput])
					);
				} catch (e) {
					alert(e);
				}
			}}
		/>
		<NativeSelect
			data={[...$devices.list.map((device) => device.name), '']}
			on:change={(e) => {
				selectedDevice = $devices.list.find((device) => device.name === e.target.value);
			}}
		/>
	</Flex>
	<div class="consoleBox">
		<pre>{#each $consoleMessages as message}<p>[{message.time}] - {message.name}: {message.message}</p>{/each}</pre>
	</div>
	<form
		class="hexInputContainer"
		on:submit|preventDefault={async () => {
			try {
				// check if hexInput is valid. So a valid hexInput should be like 0x02 0x26 0x50 0x20 0xc1 0xff
				if (!hexInput.match(/^(0x[0-9a-fA-F]{2}\s*)+$/)) {
					alert('Invalid hex input');
					return;
				}
				const hexArray = hexInput.split(' ').map((hex) => parseInt(hex, 16));
				await BleClient.write(
					selectedDevice.id,
					serviceUuid,
					characteristicUuid,
					new Uint8Array([selectedDevice.name === 'Serial1' ? 0x02 : 0x03, ...hexArray])
				);
			} catch (e) {
				alert(e);
			}
		}}
	>
		<input type="text" class="hexInput" bind:value={hexInput} />

		<NativeSelect
			override={{
				minWidth: '90px'
			}}
			data={['Serial1', 'Serial2']}
			on:change={(e) => {
				selectedDevice = $devices.list.find((device) => device.name === e.target.value);
			}}
		/>
		<Button color="gray" variant="outline">Send</Button>
	</form>
</main>

<style>
	main {
		width: 1100px;
		max-width: calc(100vw - 40px);
		margin: 0 auto;
		padding: 5px 20px;
	}
	.consoleBox {
		background: #272727 !important;
		border-radius: 15px;
		height: 350px;
		overflow: auto;
		padding: 5px 20px;
	}
	.hexInputContainer {
		display: flex;
		align-items: center;
		margin-top: 10px;
		gap: 10px;
	}
	.hexInput {
		background: #272727;
		border: 1px solid #333;
		border-radius: 5px;
		height: 25px;
		color: #fff;
		padding: 5px;
		width: 100%;
	}
	.delayInput {
		background: #272727;
		border: 1px solid #333;
		border-radius: 5px;
		height: 25px;
		color: #fff;
		padding: 5px;
	}
</style>
