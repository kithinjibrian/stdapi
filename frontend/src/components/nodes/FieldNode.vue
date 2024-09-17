<script setup>
import { Position, Handle, useVueFlow } from '@vue-flow/core'
import TemplateNode from '@/components/nodes/TemplateNode.vue';

import { ref, computed, onMounted } from 'vue';

import { useEventBus } from '@/stores/ebus';
import { useNodeStore } from '@/stores/nodes';

const eventBus = useEventBus();
const nodesStore = useNodeStore();

const docs = `Creates a new model class.  
<b>@input field</b> -  a  model's
fields. Can connect multiple
field nodes.
<b>@output model</b>  -  an  object
with the model name and an 
array of associated fields.
`

const props = defineProps(['id', 'data']);
const { updateNodeData, findNode } = useVueFlow();

const code_gen = (data) => {
    let attrs = '()';
    if(Object.keys(data.attributes).length != 0) {
        attrs = `(${Object.values(data.attributes).map(attr => attr.code).join(', ')})`;
    }
    return `${data.field_name} = models.${data.data_type}${attrs}`;
}

const update_node_data = (id, data) => {
    data['code'] = code_gen(data);
    eventBus.emit(id, data);
    updateNodeData(id, data);
}

const pull_data = () => {
    const attrs = props.data.attributes ? {...props.data.attributes} : {};

    nodesStore
        .get_edges
        .filter(edge => edge.target == props.id)
        .map(edge => {
            const node = findNode(edge.source);
            const {
            id,
            ...data
            } = node.data;

            attrs[edge.source] = data;
        });

    return attrs;
}

const field_name = computed({
    get: () => props.data.field_name,
    set: (value) => {
        update_node_data(props.id, {
            ...props.data, 
            type: "field", 
            id: props.id, 
            field_name: value, 
            attributes: pull_data()
        });
    }
});

const data_type = computed({
    get: () => props.data.data_type,
    set: (value) => {
        update_node_data(props.id, {
            ...props.data, 
            type: "field", 
            id: props.id, 
            data_type: value,
            attributes: pull_data(value)
        });
    }
});

const accept_push_data = (data) => {

    const attributes = props.data.attributes ? {...props.data.attributes} : {};

    const {
        id,
        ...value
    } = data;

     attributes[id] = value;

    update_node_data(props.id, {...props.data, attributes });
};

onMounted(() => {
    props.data.cb = accept_push_data;
})

</script>

<template>
  <TemplateNode
    name="Field"
    type="field"
    :id="id"
    :docs="docs">
    <template v-slot:inputs>
        <div class="mt-4">
            <v-text-field
            v-model="field_name"
            density="compact"
            variant="outlined"
            label="field name"/>
            <v-text-field
            v-model="data_type"
            density="compact"
            variant="outlined"
            label="data type"/>
        </div>
    </template>
    <template v-slot:handles="{ hide }">
    <Handle id="attributes-1" type="target" :position="Position.Left">
        <div v-if="!hide" class="hl__left">
            attributes    
        </div>   
    </Handle>
    <Handle id="field-2" type="source" :position="Position.Right">
        <div v-if="!hide" class="hl__right">
            field    
        </div>   
    </Handle>
    </template>
  </TemplateNode>
</template>

<style scoped>

.vue-flow__handle-left {
    top: 90%;
    left: 0;
    transform: translate(-50%, -50%);
}

.hl__left {
    position: absolute;
    transform: translate(25%, -27%);
    user-select: none;
}

.vue-flow__handle-right {
  top: 31%;
  right: 0;
  transform: translate(50%, -50%);
}

.hl__right {
    position: absolute;
    transform: translate(-110%, -27%);
    user-select: none;
}

</style>

<style>

.vue-flow__node-field {
    border: 1px solid var(--vf-node-color);
}

.vue-flow__node-field.selected, 
.vue-flow__node-field:focus, 
.vue-flow__node-field:focus-visible {
  outline: none;
  border: 1px solid #7700ff;
}

.vue-flow__node-field.selected, 
.vue-flow__node-field.selected:hover {
  box-shadow: 0 0 0 0.5px var(--vf-box-shadow);
}

.vue-flow__node-field {
  --vf-handle:#7700ff;
  --vf-box-shadow:#7700ff;
}


</style>