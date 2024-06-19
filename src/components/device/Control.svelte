<script>
	import { Button } from '@svelteuidev/core';
	export let title;
</script>

<main>
	<div class="controllerContainer">
		<Button variant="outline" color="green">Read</Button>
		<h3 class="name">
			{title || ''}
		</h3>
		<Button variant="outline" color="red">Write</Button>
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
