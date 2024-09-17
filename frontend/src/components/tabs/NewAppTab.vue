<script setup>
// cSpell: ignore viewset codeview
import { ref, markRaw } from 'vue';
import { Background } from '@vue-flow/background'
import { VueFlow, Panel, useVueFlow , ConnectionMode } from '@vue-flow/core'

import { useEventBus } from '@/stores/ebus';
import { useNodeStore } from '@/stores/nodes';

import FieldNode from '@/components/nodes/FieldNode.vue';
import ModelNode  from '@/components/nodes/ModelNode.vue';
import ViewsetNode from '@/components/nodes/ViewsetNode.vue';
import CodeviewNode from '@/components/nodes/CodeviewNode.vue';
import AttributesNode from '@/components/nodes/AttributesNode.vue';

const eventBus = useEventBus();
const nodesStore = useNodeStore();

const source_node = ref(null);

const nodeTypes = {
  model: markRaw(ModelNode),
  field: markRaw(FieldNode),
  viewset: markRaw(ViewsetNode),
  codeview: markRaw(CodeviewNode),
  attributes: markRaw(AttributesNode),
}

const { findNode } = useVueFlow();
const { onConnect } = useVueFlow();
const { updateEdge, addEdges, removeEdges } = useVueFlow();

onConnect((params) => {
    if(params.source !== params.target)
    {
        const node = findNode(params.target);
        eventBus.once(params.source, node.data.cb);
        addEdges([params]);
    }
})

// edge event handlers
const { 
  onEdgeClick,
  onEdgeUpdate,
  onEdgeUpdateEnd,
} = useVueFlow()

onEdgeUpdate(({ edge, connection }) => {
    updateEdge(edge, connection)
})

onEdgeUpdateEnd(({edge}) => {
    if(edge)
    {
        removeEdges([edge])
    }
})

// node event handlers
const { 
    onNodeClick,
    onNodeDragStart,
} = useVueFlow();

onNodeClick(({node}) => {
})

onNodeDragStart((event) => {
  //console.log('Node drag started', event)
})

onEdgeClick((event) => {
  //console.log('Edge clicked', event)
})

</script>

<template>
     <v-sheet height="82.3vh">
        <VueFlow
        v-model:nodes="nodesStore.nodes"
        v-model:edges="nodesStore.edges"
        auto-connect
        edges-updatable
        :node-types="nodeTypes"
        :connection-radius="30"
        connection-mode="ConnectionMode.Strict">
            <Background/>
        </VueFlow>
     </v-sheet>
</template>
