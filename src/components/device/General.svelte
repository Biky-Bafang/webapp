<script>
	import { Button, Flex, Text } from '@svelteuidev/core';
	let buttons = [
		{
			label: 'Low Battery Protection',
			value: '40V'
		},
		{
			label: 'Current Limit',
			value: '24A'
		},
		{
			label: 'Speed Limit Type',
			value: 'External, Wheel Meter'
		},
		{
			label: 'Speed Meter Signals',
			value: '1'
		},
		{
			label: 'Wheel Diameter',
			value: '26 inch'
		}
	];
</script>

<main>
	<div class="buttonsContainer">
		{#each buttons as button}
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
