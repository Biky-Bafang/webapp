<script>
	import Header from '../../../components/Header.svelte';
</script>

<main>
	<header></header>
	<div class="slot">
		<slot />
	</div>
</main>

<style>
	main {
		background: #171717 !important;
		width: 100vw;
		height: 100vh;
	}
	.slot {
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
