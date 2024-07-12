<script>
	import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
	import { Handle, Position } from '@xyflow/svelte';
	import Fa from 'svelte-fa';
</script>

<main>
	<div class="iconContainer">
		<Fa icon={faFlagCheckered} size={'1.6x'} color={'white'} />
	</div>
	<Handle
		style={`width: 15px; height: 0; 
	`}
		id="b"
		type="target"
		position={Position.Top}
	></Handle>
</main>

<style>
	.iconContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
	}
</style>
