<script>
	import { writable } from 'svelte/store';
	import { SvelteFlow, Background, Controls, MarkerType } from '@xyflow/svelte';
	import Flow from '../flowTypes/Flow.svelte';

	import './flow.css';
	import { faPersonArrowUpFromLine, faPlay } from '@fortawesome/free-solid-svg-icons';
	import Finish from '../flowTypes/Finish.svelte';
	import Edge from '../flowTypes/ButtonEdge.svelte';
	import ButtonEdge from '../flowTypes/ButtonEdge.svelte';
	import AddEdge from '../flowTypes/AddEdge.svelte';

	const nodes = writable([
		{
			id: '10',
			position: { x: 0, y: 0 },
			data: { label: 'Trigger', title: 'hey', icon: faPlay }
		},
		{
			id: '11',
			position: { x: 0, y: 0 },
			data: { label: 'Trigger', title: 'hey', icon: faPlay }
		},
		{
			id: '12',
			position: { x: 0, y: 0 },
			data: { title: 'test' }
		},
		{
			id: '13',
			position: { x: 0, y: 0 },
			data: { title: 'test' }
		},
		{
			id: '14',
			position: { x: 0, y: 0 },
			data: { title: 'test' }
		},
		{
			id: '15',
			position: { x: 0, y: 0 },
			data: { title: 'test' }
		},
		{
			id: '16',
			position: { x: 0, y: 0 },
			data: { title: 'test' }
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
	$: if ($nodes) {
		// automatically position the nodes
		let lastTrigger = $nodes
			.filter((node) => node.data.label === 'Trigger')
			.reduce((prev, current) => (prev.position.x > current.position.x ? prev : current));
		// position every trigger 400 pixels to the right for each index and filter the finish nodes
		$nodes
			.filter((node) => node.data.label === 'Trigger')
			.forEach((node, index) => {
				node.position = { x: 400 * index, y: 0 };
			});
		let currentXIndex = 1;
		let currentYIndex = 0;
		$nodes
			.filter((node) => node.data.label !== 'Trigger')
			.filter((node) => node.type !== 'finish')
			.forEach((node, index) => {
				for (let i = 0; i < $edges.length; i++) {
					let edge = $edges[i];
					if (edge.source === node.id || edge.target === node.id) return;
				}
				// while the { x: lastTrigger.position.x + 275 * currentXIndex, y: 125 * currentYIndex } x and y of these is one of the nodes then add 1 to the x and y
				// if the x is 3 then add 1 to the y and set x to 1
				while (
					$nodes.find(
						(n) =>
							n.position.x === lastTrigger.position.x + 275 * currentXIndex &&
							n.position.y === 225 * currentYIndex
					)
				) {
					currentXIndex++;
					if (currentXIndex > 2) {
						currentXIndex = 1;
						currentYIndex++;
					}
				}
				node.position = { x: lastTrigger.position.x + 275 * currentXIndex, y: 225 * currentYIndex };
				currentXIndex++;
				if (currentXIndex > 2) {
					currentXIndex = 1;
					currentYIndex++;
				}
			});
		currentXIndex = 1;
		currentYIndex = 0;
		$nodes
			.filter((node) => node.data.label !== 'Trigger')
			.filter((node) => node.type !== 'finish')
			.forEach((node, index) => {
				let sourceNodeEdge = $edges.find(
					(edge) => edge.target === node.id && edge.source !== node.id
				);
				if (!sourceNodeEdge) return;
				let sourceNode = $nodes.find((node) => node.id === sourceNodeEdge.source);
				if (!sourceNode) return;
				node.position = {
					x: sourceNode?.position?.x,
					y: sourceNode?.position?.y + (index == 1 ? 150 : 180)
				};
			});
		// add the finish node here instead
		$nodes
			.filter((node) => node.type !== 'finish')
			.forEach((node, index) => {
				// if the node doesnt have a target, add the finish node as target
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
							type: node.data.type === 'finish' ? 'button' : 'addButton'
						});
						return edges;
					});
				}
			});
		// always align finish nodes with the source node
		$nodes.forEach((node) => {
			if (node.type === 'finish') {
				let sourceNodeEdge = $edges.find(
					(edge) => edge.target === node.id && edge.source !== node.id
				);
				if (!sourceNodeEdge) return;
				let sourceNode = $nodes.find((node) => node.id === sourceNodeEdge.source);
				if (!sourceNode) return;
				node.position = {
					x: sourceNode?.position?.x + 96.3,
					y: sourceNode?.position?.y + 150
				};
			}
		});
		$nodes = $nodes;
		// wait 1ms
		setTimeout(() => {
			$nodes = $nodes;
		}, 1);
	}
	$: if ($edges) {
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
		button: ButtonEdge,
		addButton: AddEdge
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
