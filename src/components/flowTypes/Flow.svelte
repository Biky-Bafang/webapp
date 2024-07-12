<script>
	import { faBolt, faEllipsis, faListDots } from '@fortawesome/free-solid-svg-icons';
	import { Handle, Position } from '@xyflow/svelte';
	import Fa from 'svelte-fa';
	export let data = {};
</script>

{#if data.label}
	<div class="topLabel">{data.label}</div>
{/if}
<div class="flowContainer" style={`margin-top: ${data.dots ? '12.5px' : '0'}`}>
	<div class="flowIcon">
		<Fa icon={data.icon ?? faBolt} size={'1.6x'} color={'white'} />
	</div>
	<div class="flowInfo">
		<h2>
			{data.title || 'Speed'}
		</h2>
		<p>
			{data.description || 'Speed of the device'}
		</p>
	</div>
	<div class="flowSettings">
		<Fa icon={faEllipsis} size={'1.6x'} color={'white'} />
	</div>
	{#if !data.label}
		<Handle
			style={`width: 25px; height: 25px; border-radius: 50%;
		background-color: #2c2c2c; 
			background-image: radial-gradient(circle, #ffffff 25%, #2c2c2c 25%);
	`}
			id="a"
			type="target"
			position={Position.Top}
		></Handle>
	{/if}
	<Handle
		style={`width: 25px; height: 25px; border-radius: 50%; left: ${data.ifStatement ? 35 : 50}%;
			background-image: radial-gradient(circle, #ffffff 25%, #2c2c2c 25%);
		`}
		id="a"
		type="source"
		position={Position.Bottom}
	></Handle>
	{#if data.ifStatement}
		<Handle
			style={`width: 25px; height: 25px; border-radius: 50%; left: 65%;
			background-image: radial-gradient(circle, #ffffff 25%, #2c2c2c 25%);
		`}
			id="b"
			type="source"
			position={Position.Bottom}
		></Handle>
	{/if}
</div>

<style>
	.topLabel {
		font-size: 1rem;
		font-weight: bold;
		color: rgb(245, 245, 245);
		background-color: #006486;
		padding: 5px 10px 4px 10px;
		border-radius: 10px 10px 0 0;
	}
	.flowContainer {
		/* make an grid */
		display: grid;
		grid-template-columns: auto 1fr auto;
		width: 100%;
		align-items: center;
		border-radius: 10px;
		position: relative;
	}

	.flowIcon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		margin: 10px;
		background-color: #7d7d7d;
		width: 35px;
		height: 35px;
		border-radius: 15px;
	}
	.flowInfo {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.flowInfo h2 {
		margin: 0;
		font-size: 1.2rem;
	}
	.flowInfo p {
		margin: 0;
		font-size: 0.8rem;
		color: #b4b4b4;
	}
	.flowSettings {
		padding: 15px;
	}
</style>
