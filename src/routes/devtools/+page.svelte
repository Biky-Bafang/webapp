<script>
	import { consoleMessages } from '$lib/stores';
	import { Button } from '@svelteuidev/core';
	// loop 20 times
	// every 1 sec add a new message
</script>

<main>
	<Button
		color="gray"
		variant="subtle"
		on:click={() => {
			consoleMessages.set([]);
		}}>Clear</Button
	>
	<div class="consoleBox">
		<pre>{#each $consoleMessages as message}<p>[{message.time}] - {message.name}: {message.message}</p>{/each}</pre>
	</div>
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
</style>
