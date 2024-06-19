<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
	import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
	import { UnstyledButton } from '@svelteuidev/core';
	let icons = [
		{
			icon: faRightToBracket,
			id: 'login'
		}
	];
	let pages = {
		'/': 'Devices',
		'/settings': 'Settings',
		'/devtools': 'Dev Tools'
	};
</script>

<main>
	<!-- make an nav bar -->
	<nav>
		<UnstyledButton
			on:click={() => {
				goto('/');
			}}
		>
			<div class="logo">
				<img src={logo} alt="logo" />
			</div>
		</UnstyledButton>
		<h1>
			{pages[$page.url.pathname]}
		</h1>
	</nav>
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		height: 60px;
	}
	.logo {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
	}
	.logo img {
		width: 60px;
	}
</style>
