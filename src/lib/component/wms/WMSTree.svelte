<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script>
//	import { slide } from 'svelte/transition'
	export let wmsLayer;
    export let onClick = null;
    export let capabilitiesUrl;
	let label = wmsLayer.description();

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
	}
	
	function hasChildren() {
		wmsLayer.layers().length > 0
	}
	$: arrowDown = expanded;
	$: children = wmsLayer.layers()
</script>

<ul><!-- transition:slide -->
	<li>
		{#if hasChildren()}
			<span on:click={toggleExpansion}>
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{label}
			</span>
			{#if expanded}
				{#each children as child}
					<svelte:self wmsLayer={child} onClick={onClick} />
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				{label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
</style>
