<script>
	import { Button, Flex, NativeSelect, Text } from '@svelteuidev/core';
	export let inputs = [];
</script>

<main>
	<div class="buttonsContainer">
		{#each inputs as button}
			<Button
				ripple
				override={{
					background: 'transparent !important',
					color: 'inherit',
					padding: '15px 20px',
					margin: '0',
					height: '100%',
					width: '100%',
					justifyContent: 'flex-start',
					textAlign: 'left',
					'&:hover': {
						background: 'transparent'
					}
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					override={{
						width: '100%'
					}}
				>
					<Text size={15} color="white">{button.label}</Text>
					<Text size={15} color="#d4d4d4" weight="bold">{button.value}</Text>
				</Flex>
			</Button>
		{/each}
	</div>
</main>

<style>
	.buttonsContainer {
		background-color: rgb(53, 53, 53);
		margin-top: 10px;
	}
</style>
