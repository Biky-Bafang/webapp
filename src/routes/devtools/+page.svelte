<script>
	let consoleMessages = [];
	// loop 20 times
	// every 1 sec add a new message
	setInterval(() => {
		consoleMessages.push({
			time: new Date().toLocaleTimeString(),
			message: 'Hello world',
			name: 'display'
		});
		consoleMessages = consoleMessages;
	}, 1000);
</script>

<main>
	<div class="consoleBox">
		<pre>{#each consoleMessages as message}<p>[{message.time}] - {message.name}: {message.message}</p>{/each}</pre>
	</div>
</main>

<style>
	main {
		width: 1100px;
		margin: 0 auto;
	}
	.consoleBox {
		background: #272727 !important;
		padding: 5px 20px;
		border-radius: 15px;
		height: 350px;
		overflow: auto;
	}
</style>
