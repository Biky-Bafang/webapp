<script>
	import pointer from '$lib/images/pointer.svg';
	import { browser } from '@svelteuidev/composables';
	import { onMount } from 'svelte';
	let innerWidth = 0;
	let innerHeight = 0;
	let width = 0;
	let height = 0;
	let speed = 0;
	let maxkm = 30;
	let numbers = 5;
	let gap = 120;
	let indicators = Math.round(maxkm / numbers / (maxkm < 30 ? 1 : 2)) * numbers;
	$: if (browser && innerWidth && innerHeight) {
		width = innerWidth > 800 ? 800 : innerWidth;
		height = innerHeight > 800 ? 800 : innerHeight;
		// set the window variable innerWidth and innerHeight to the current values
		document.documentElement.style.setProperty('--innerWidth', `${width}px`);
		document.documentElement.style.setProperty('--innerHeight', `${height}px`);

		// align all numbers with the indicators at the end
		let num = document.querySelectorAll('.number');
		num.forEach((n) => {
			let id = n.id.replace('num', '');
			n.style.transform = `rotate(${id * ((360 - gap) / indicators) + 180}deg)`;
			// set the rotate element to the opposite of the number
			document.getElementById(`rotate${id}`).style.transform =
				`rotate(${-id * ((360 - gap) / indicators) - 180}deg)`;
		});
	}
	onMount(() => {
		speed = 20;
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<main>
	<div class="displayContainer">
		<div></div>
		<div class="centerDisplay">
			<svg
				class="pointer"
				width="5"
				height={360 + width / 3}
				xmlns="http://www.w3.org/2000/svg"
				style={`transform: rotate(${speed * ((360 - gap) / maxkm) + 180}deg)`}
			>
				<polygon points={`0,180 2.5,80 5,180`} fill="white" />
			</svg>
			{#each Array(indicators + 1) as item, i}
				<!-- use 50 and deg to calculate the deg it each ttime uses -->
				<svg
					style={`transform: rotate(${i * ((360 - gap) / indicators) + 180}deg)`}
					class="indicator"
					width="3"
					height={200 + width / 3}
					xmlns="http://www.w3.org/2000/svg"
					id={i}
				>
					<!-- add an indicator stripe at the end as an cube -->
					<rect
						x="0"
						y="0"
						width="3"
						height={// if it is a multiple of 5 then it is a cube
						i % Math.round(indicators / numbers) === 0 ? 20 : 10}
						fill="white"
					/>
					<!-- add an cube at the start aswell -->
				</svg>
				{#if i % Math.round(indicators / numbers) === 0}
					<div id={`num${i}`} class="number">
						<p class="rotate" id={`rotate${i}`}>
							{Math.round(i * (maxkm / indicators))}
						</p>
					</div>
				{/if}
			{/each}
			<h1>
				<!-- calculate the speed from rotation -->
				{speed}
			</h1>
			<h2>km/h</h2>
		</div>
	</div>
</main>

<style>
	:root {
		--innerWidth: 0px;
		--innerHeight: 0px;
	}
	.number {
		position: absolute;
		font-size: 1rem;
		color: white;
		height: calc(var(--innerWidth) / 3 + 180px);
	}
	.indicator {
		position: absolute;
		transition: transform 0.5s;
		fill: #4a7ba3;
		z-index: 0;
	}
	.pointer {
		position: absolute;
		transform: rotate(-45deg);
		transition: transform 0.5s;
		fill: #4a7ba3;
		z-index: 0;
	}
	.centerDisplay {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 3px solid #4a7ba3;
		border-radius: 50%;
		width: calc(var(--innerWidth, 0px) / 3);
		height: calc(var(--innerWidth, 0px) / 3);
		z-index: 1;
		margin: 180px auto;
	}
	.centerDisplay h1 {
		font-size: 3rem;
		margin: 0;
	}
	.centerDisplay h2 {
		font-size: 1.5rem;
		margin: 0;
	}
	.displayContainer {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.displayContainer > * {
		grid-column: 1;
		grid-row: 1;
	}
</style>
