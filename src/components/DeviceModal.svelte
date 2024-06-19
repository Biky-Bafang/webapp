<script>
	import { Overlay, ThemeIcon, Divider, Flex } from '@svelteuidev/core';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { faCross, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let title = '';
	export let color = 'blue';
	export let opened = false;
	export let height = 'unset';
	export let position = 'bottom';
	export let hasCloseButton = true;
	export let padding = '2rem';
	export let loading = true;
	export let loadingTime = 5000;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};
	const handleReload = () => {
		dispatch('reload');
		opened = false;
		opened = true;
	};

	// do handleClose when key esc is pressed
	if (typeof window !== 'undefined')
		document.documentElement.style.setProperty('--padding', padding);
	let randomId = Math.random().toString(36).substring(7);
	let timeout;
	$: if (opened) {
		loading = true;
		timeout = setTimeout(() => {
			loading = false;
		}, loadingTime);
	}
	onMount(() => {
		dispatch('load');
		const handleEsc = (e) => {
			if (e.key === 'Escape' && hasCloseButton) {
				handleClose();
			}
		};
		const mouseDown = (e) => {
			if (!e.target.closest('.modal') && hasCloseButton) {
				if (e.target.id === randomId) {
					handleClose();
				}
			}
		};
		window.addEventListener('keydown', handleEsc);
		window.addEventListener('mousedown', mouseDown);
		return () => {
			window.removeEventListener('keydown', handleEsc);
			window.removeEventListener('mousedown', mouseDown);
		};
	});
</script>

{#if opened}
	<div
		class="overlay"
		on:click={() => {
			alert('click');
		}}
		on:keydown={() => {}}
		aria-hidden
		transition:fade={{ duration: 200, easing: cubicOut }}
	>
		<Overlay color="#888" />
	</div>
	<main id={randomId}>
		<div
			class="modal"
			transition:fly={{ duration: 250, y: 200, easing: cubicOut }}
			style={`height: ${height};`}
		>
			<div class="flexDivider">
				<div class="modalContainer">
					<div class="top">
						<br />
						<div class="modalClose">
							{#if hasCloseButton}
								<div class="modalCloseButton" aria-hidden class:loading on:click={handleReload}>
									<Fa icon={faRotate} rotate={45} size="1.25x" />
								</div>
							{:else}
								<div />
							{/if}
							{#if position === 'top'}
								<span class="title">{title}</span>
							{/if}
						</div>
						<div class="iconContainer">
							{#if position === 'left'}
								<span class="title">{title}</span>
							{/if}
							{#if $$slots.icon}
								<ThemeIcon
									variant="light"
									override={{
										borderRadius: '50%'
										// center
									}}
									size={65}
									{color}
								>
									<slot name="icon" />
								</ThemeIcon>
							{/if}
							{#if position === 'right'}
								<span class="title">{title}</span>
							{/if}
						</div>
						<div class="text">
							{#if position === 'bottom'}
								<div class="centerText">
									<span class="title">{title}</span>
								</div>
							{/if}
							<br />
							<div class="slot">
								<slot />
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="buttons">
							<slot name="leftButton" />
							<slot name="rightButton" />
						</div>
					</div>
				</div>
				{#if $$slots.right}
					<Divider orientation="vertical" />
					<div>
						<slot name="right" />
					</div>
				{/if}
			</div>
		</div>
	</main>
{/if}

<style>
	.slot {
		width: 100%;
		text-align: left;
		margin: 0 auto;
	}
	.centerText {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.flexDivider {
		display: grid;
		grid-template-columns: 1fr auto auto;
		padding: var(--padding);
	}
	.overlay {
		/* full screen */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 21;
	}
	main {
		position: fixed;
		/* make it full screen */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* center */
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 21;
	}
	.top {
		grid-row: 1;
		/* align to top */
		align-self: start;
	}

	.bottom {
		grid-row: 2;
		width: 100%;
	}
	.modal {
		min-width: 640px;
		width: max-content;
		max-width: min-content;
		padding: 0;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #0f0f0f;
		border-radius: 1.5rem;
		position: absolute;
		height: fit-content;
		max-height: 100%;
		overflow: auto;
		box-shadow:
			0px 1px 3px rgba(7, 14, 35, 0.02),
			0px 2px 8px rgba(7, 14, 35, 0.01);
		transition: box-shadow 0.3s ease-in-out;
		outline: none;
	}
	.modalClose {
		position: absolute;
		top: 0;
		right: 0;
		padding: 15px 25px;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		left: 0;
		direction: rtl;
	}
	.modalCloseButton {
		cursor: pointer;
		/* remove button higlight */
		-webkit-tap-highlight-color: transparent;
		background-color: rgb(66, 66, 66);
		width: 35px;
		height: 35px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modalCloseButton.loading {
		animation: rotate 0.8s linear infinite;
	}
	.modalCloseButton:active {
		background-color: rgb(77, 77, 77);
	}
	/* make an rotation animation */
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.modalContainer {
		display: grid;
		grid-template-rows: 1fr;
		grid-column-end: 2;
		align-items: center;
		height: 100%;
	}
	.iconContainer {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
	}
	.text {
		margin: 1rem 0;
	}
	.title {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
	}
	.buttons {
		display: flex;
		/* space between */
		justify-content: space-around;
		width: 100%;
	}
	@media (max-width: 768px) {
		.modal {
			min-width: calc(100% - 2rem);
			width: calc(100% - 2rem);
			transform: translate(-50%, 0%);
			bottom: 1rem;
		}
	}
</style>
