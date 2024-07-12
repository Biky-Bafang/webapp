<script>
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import { Button } from '@svelteuidev/core';
	import Fa from 'svelte-fa';
	// export all the parameters of the component to data
</script>

<main>
	<Button
		override={{
			padding: '0',
			margin: '0',
			width: '35px',
			height: '35px',
			borderRadius: '25%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}
	>
		<Fa icon={faPlus} />
	</Button>
</main>
