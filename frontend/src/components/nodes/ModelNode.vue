<script setup>
import { Position, Handle, useVueFlow } from '@vue-flow/core'
import TemplateNode from '@/components/nodes/TemplateNode.vue';

import { ref, computed, onMounted } from 'vue';

import { useEventBus } from '@/stores/ebus';
import { useNodeStore } from '@/stores/nodes';

const eventBus = useEventBus();
const nodesStore = useNodeStore();

const docs = `Creates a new model class.
<b>@input 'model name'</b> - The 
model's class name.  
<b>@input field</b> - a model's
fields. Can connect multiple
field nodes.
<b>@output model</b> - an object
with the model name and an 
array of associated fields.
`;

const props = defineProps(['id', 'data']);
const { updateNodeData, findNode } = useVueFlow();

const code_gen = (data) => {
    let header = `from django.db import models

class ${data.model_name}(models.Model):`

    if(Object.keys(data.fields).length == 0) {
        return `# model ${data.model_name} has no fields
${header}
    pass        
`;
    } else {

        let codes = Object.values(data.fields).map(field => field.code).join('\n\t');

        return `# model ${data.model_name}
${header}
    ${codes}
`;
    }
}

const update_node_data = (id, data) => {
    data['code'] = code_gen(data);
    eventBus.emit(id, data);
    updateNodeData(id, data);
}

const model_name = computed({
    get: () => props.data.model_name,
    set: (value) => {

         const fields = props.data.fields ? {...props.data.fields} : {};
        // pull data from connected nodes
        nodesStore
            .get_edges
            .filter(edge => edge.target == props.id)
            .map(edge => {
                const node = findNode(edge.source);
                const {
                id,
                ...data
                } = node.data;

                fields[edge.source] = data;
            });
    
        update_node_data(props.id, { type: "model", model_name: value, fields });
    }
});

// accept data being pushed by connected nodes
const accept_push_data = (data) => {

    const fields = props.data.fields ? {...props.data.fields} : {};

    const {
        id,
        ...value
    } = data;

     fields[id] = value;

    update_node_data(props.id, {...props.data, fields });
};

onMounted(() => {
    props.data.cb = accept_push_data;
})

</script>

<template>
  <TemplateNode 
  name="Model" 
  type="model" 
  :docs="docs"
  :id="id">
    <template 
    v-slot:inputs>
        <div class="mt-4">
            <v-text-field
            v-model="model_name"
            density="compact"
            variant="outlined"
            label="model name"/>
        </div>
    </template>
    <template v-slot:handles="{ hide }">
    <Handle 
    id="field-model-1" 
    type="target" 
    :position="Position.Left">
        <div v-if="!hide" class="hl__left">
            field    
        </div>   
    </Handle>
    <Handle 
    id="model-model-1" 
    type="source" 
    :position="Position.Right">
        <div v-if="!hide"  class="hl__right">
            model    
        </div>   
    </Handle>
    </template> 
  </TemplateNode>
</template>

<style scoped>

.vue-flow__handle-left {
    top: 87%;
    left: 0;
    transform: translate(-50%, -50%);
}

.vue-flow__handle-right {
  top: 42%;
  right: 0;
  transform: translate(50%, -50%);
}

.hl__right {
    position: absolute;
    transform: translate(-110%, -27%);
    user-select: none;
}

.hl__left {
    position: absolute;
    transform: translate(50%, -27%);
    user-select: none;
}

</style>