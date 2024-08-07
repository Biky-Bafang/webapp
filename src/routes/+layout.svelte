<script>
	import { SvelteUIProvider, UnstyledButton } from '@svelteuidev/core';
	import Header from '../components/Header.svelte';
	import './styles.css';
	import { page } from '$app/stores';
	import { beforeNavigate, goto, onNavigate } from '$app/navigation';
	import { faCode, faGear, faPersonBiking } from '@fortawesome/free-solid-svg-icons';
	import { App as CapacitorApp } from '@capacitor/app';
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';
	import { devices } from '$lib/stores';
	import { Storage } from '@capacitor/storage';

	let icons = [
		{
			icon: faCode,
			id: 'devTools',
			path: '/devtools'
		},
		{
			icon: faPersonBiking,
			id: 'devices',
			path: '/'
		}
	];
	let pages = {
		device: {
			settings: {
				color: '#2c2d2e',
				edit: {
					color: '#2c2d2e'
				}
			},
			flow: {
				color: '#2c2d2e'
			},
			color: '#1c1d1e'
		},
		test: {
			color: '#2c2d2e'
		}
	};
	$: if ($page.url.pathname && typeof document !== 'undefined') {
		try {
			// set the appcolor of the app to the color of the page
			const path = $page.url.pathname.split('/').splice(1);
			let color = pages;
			for (let i = 0; i < path.length; i++) {
				if (!color[path[i]]) break;
				color = color[path[i]];
			}

			document.documentElement.style.setProperty('--app-color', color.color);
		} catch (e) {
			alert(e);
		}
	}
	onNavigate((navigation) => {
		if (
			navigation.from?.route.id.split('/').length > navigation.to?.route.id.split('/').length ||
			navigation.to?.route.id == '/'
		) {
			document.documentElement.style.setProperty(
				'--view-transition-old',
				'slide-from-right-reverse'
			);
			document.documentElement.style.setProperty('--view-transition-new', 'slide-to-left-reverse');
			// have new one a higher z-index and other 0
			document.documentElement.style.setProperty('--view-transition-old-z-index', '1');
			document.documentElement.style.setProperty('--view-transition-new-z-index', '0');
			// duration
			document.documentElement.style.setProperty('--view-transition-old-duration', '350ms');
			document.documentElement.style.setProperty('--view-transition-new-duration', '350ms');
		} else if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--view-transition-old', 'slide-to-left');
			document.documentElement.style.setProperty('--view-transition-new', 'slide-from-right');
			// have old one a higher z-index
			document.documentElement.style.setProperty('--view-transition-old-z-index', '0');
			document.documentElement.style.setProperty('--view-transition-new-z-index', '1');
			// duration
			document.documentElement.style.setProperty('--view-transition-old-duration', '350ms');
			document.documentElement.style.setProperty('--view-transition-new-duration', '350ms');
		}
		// dont animate if navigation.to?.route.id contains settings
		if (
			!(navigation.to?.route.id.includes('device') || navigation.from?.route.id.includes('device'))
		)
			return;
		return new Promise((resolve) => {
			// if the url contains device, do not animate
			document.startViewTransition &&
				navigation.from?.route.id !== navigation.to?.route.id &&
				document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
				});
		});
	});
	if (typeof window !== 'undefined') {
		CapacitorApp.addListener('backButton', ({ canGoBack }) => {
			if (!canGoBack) {
				CapacitorApp.exitApp();
			} else {
				window.history.back();
			}
		});
	}

	async function saveDevices(value) {
		await Storage.set({
			key: 'devices',
			value: JSON.stringify(value)
		});
	}

	// Load devices from Capacitor Storage
	async function loadDevices() {
		const { value } = await Storage.get({ key: 'devices' });
		let tempDevices = { ...$devices };
		delete tempDevices.list;
		let valueJson = { ...JSON.parse(value), ...tempDevices };
		valueJson.list = valueJson.list.map((device) => {
			return {
				id: device.id,
				name: device.name,
				flows: device.flows,
				status: '\u200b'
			};
		});
		// remove the status from the list devies
		if (value && valueJson.list.length > 0) {
			devices.set(valueJson);
			return;
		}
		// set devices to a custom named object for debugging
		devices.set({
			list: [
				{
					id: '1',
					name: 'Device 1',
					status: '\u200b'
				}
			]
		});
	}
	onMount(() => {
		loadDevices();
		devices.subscribe((value) => {
			saveDevices(value);
		});
	});
</script>

<SvelteUIProvider themeObserver={'dark'}>
	<div class="app" class:appcolor={$page.url.pathname.includes('device')}>
		{#if !$page.url.pathname.includes('device')}
			<header>
				<Header />
			</header>
		{/if}
		<main>
			<slot />
		</main>
		{#if !$page.url.pathname.includes('device')}
			<footer>
				{#each icons as item}
					<UnstyledButton
						id={item.idname}
						on:click={() => {
							if (item.click) item.click();
							else goto(item.path);
						}}
					>
						<div class="iconWithName" class:active={$page.url.pathname === item.path}>
							<div class="icon">
								<Fa icon={item?.icon} size="18" />
							</div>
							<p class="name">
								{item.id?.charAt(0).toUpperCase() + item.id.slice(1)}
							</p>
						</div>
					</UnstyledButton>
				{/each}
			</footer>
		{/if}
	</div>
</SvelteUIProvider>

<style>
	.iconWithName.active .icon {
		display: flex;
		justify-content: center;
		width: 50px;
		border-radius: 8px;
		background-color: rgb(53, 94, 196);
		color: rgb(199, 214, 255);
		transition: width 0.3s;
	}

	.iconWithName {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50px;
		text-align: center;
	}
	.iconWithName .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 25px;
		color: white;
	}
	.iconWithName .name {
		color: white;
		font-size: 0.8rem;
		margin: 5px;
	}
	.iconWithName.active .name {
		font-weight: bold;
	}
	@keyframes -global-slide-to-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100px);
		}
	}
	@keyframes -global-slide-from-right {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}
	@keyframes -global-slide-to-left-reverse {
		from {
			transform: translateX(-100px);
		}
		to {
			transform: translateX(0);
		}
	}
	@keyframes -global-slide-from-right-reverse {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(100%);
		}
	}
	:root::view-transition-old(root) {
		/* use var */
		animation: var(--view-transition-old-duration, 200ms) cubic-bezier(0.4, 0, 0.2, 1) both
			var(--view-transition-old);
		z-index: var(--view-transition-old-z-index, 0);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	:root::view-transition-new(root) {
		animation: var(--view-transition-new-duration, 200ms) cubic-bezier(0.4, 0, 0.2, 1) both
			var(--view-transition-new);
		z-index: var(--view-transition-new-z-index, 1);
		/* add shadow */
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		margin: 0 auto;
		overflow: hidden;
	}
	.appcolor {
		background-color: var(--app-color, #1c1d1e);
	}
	header {
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		padding: 0;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 5px;
		text-align: center;
		width: 1100px;
		max-width: 100vw;
		margin: 0 auto;
		position: relative;
	}
	footer::before {
		content: '';
		position: absolute;
		height: 100%;
		width: 100vw;
		z-index: -1;
		background-color: #1c1d1e;
	}
</style>
