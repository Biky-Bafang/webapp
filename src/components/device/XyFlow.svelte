<script>
	import { writable } from 'svelte/store';
	import { SvelteFlow, Background, Controls, MarkerType } from '@xyflow/svelte';
	import Flow from '../flowTypes/Flow.svelte';

	import './flow.css';
	import { faPersonArrowUpFromLine, faPlay } from '@fortawesome/free-solid-svg-icons';
	import Finish from '../flowTypes/Finish.svelte';
	import ButtonEdge from '../flowTypes/ButtonEdge.svelte';

	const nodes = writable([
		{
			id: '11',
			position: { x: 0, y: 0 },
			data: { label: 'Trigger', title: 'hey', icon: faPlay }
		},
		{
			id: '12',
			position: { x: 0, y: 150 },
			data: { title: 'test' }
		},
		{
			id: '13',
			position: { x: 0, y: 300 },
			data: { title: 'test' }
		},
		{
			id: '13',
			position: { x: 0, y: 300 },
			data: { title: 'test' }
		},

		{
			id: '21',
			position: { x: 400, y: 0 },
			data: { label: 'Trigger', title: 'hey', icon: faPlay }
		}
	]);
	const edges = writable([
		{
			id: 'e11-12',
			source: '11',
			target: '12'
		},
		{
			id: 'e12-13',
			source: '12',
			target: '13'
		}
	]);
	$: if ($edges) {
		$nodes.forEach((node) => {
			// return if the node is a finish node
			if (node.type === 'finish') return;
			// if node doesnt have a target, add the finish node as target
			if (!$edges.find((edge) => edge.source === node.id)) {
				// add the finish node
				// make an unique id
				let finishId = 'finish' + Math.random();
				nodes.update((nodes) => {
					nodes.push({
						id: finishId,
						position: { x: node.position.x + 96.3, y: node.position.y + 150 },
						type: 'finish',
						data: { type: 'finish' }
					});
					return nodes;
				});
				// add the edge
				edges.update((edges) => {
					edges.push({
						id: 'e3-' + finishId,
						source: node.id,
						target: finishId,
						type: 'button'
					});
					return edges;
				});
			}
		});
		// if the finish node doesnt have a source, remove it
		$nodes.forEach((node) => {
			if (node.data.type === 'finish') {
				if (!$edges.find((edge) => edge.target === node.id)) {
					edges.update((edges) => edges.filter((edge) => edge.target !== node.id));
					nodes.update((nodes) => nodes.filter((n) => n.id !== node.id));
				}
			}
		});
		// check if the connected node from the finish node doesnt have another target id
		$edges.forEach((edge) => {
			if (edge.target.includes('finish')) {
				let connectedNode = edge.source;
				let finishNode = edge.target;
				// go through each edges where source is the connected node and if the edge target is not the finish node, remove the finish node
				$edges.forEach((edge) => {
					if (edge.source === connectedNode && edge.target !== finishNode) {
						nodes.update((nodes) => nodes.filter((n) => n.id !== finishNode));
						edges.update((edges) => edges.filter((e) => e.target !== finishNode));
					}
				});
			}
		});
	}

	const defaultEdgeOptions = {
		type: 'button'
	};
	const nodeTypes = {
		default: Flow,
		finish: Finish
	};
	const edgeTypes = {
		button: ButtonEdge
	};
</script>

<main>
	<SvelteFlow {nodes} {edges} {nodeTypes} {defaultEdgeOptions} {edgeTypes} colorMode="dark">
		<Background />
		<!-- <Controls /> -->
	</SvelteFlow>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
