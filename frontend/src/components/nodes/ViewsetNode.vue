<script setup>
// cSpell: ignore viewset
import { Position, Handle, useVueFlow } from '@vue-flow/core'
import TemplateNode from '@/components/nodes/TemplateNode.vue';

import { ref, onMounted } from 'vue';

const docs = `Creates a viewset class.
<b>@input model</b> - A model class.  
<b>@input serializer</b> - a 
serializer class.
<b>@output model</b> - an object
with the model name and an 
array of associated fields.
`;

const props = defineProps(['id', 'data']);
const { updateNodeData, findNode } = useVueFlow();

const cb = (data) => {
    console.log("viewset", data);
};

onMounted(() => {
    props.data.cb = cb;
})

</script>

<template>
  <TemplateNode
    name="Viewset"
    type="viewset"
    :docs="docs"
    :id="id">
    <template v-slot:inputs>
        <div class="mb-10"></div>
    </template>
    <template v-slot:handles="{ hide }">
        <Handle 
        id="model-viewset-1"
        type="target" 
        :position="Position.Left">
            <div v-if="!hide" class="hl__left">
                model    
            </div>   
        </Handle>
        <Handle 
        id="serializer-viewset-1" 
        style="top: 85%" 
        type="target" 
        :position="Position.Left">
            <div v-if="!hide" class="hl__left" style="transform: translate(30%, -30%)">
                serializer    
            </div>   
        </Handle>
    </template>
  </TemplateNode>
</template>

<style scoped>

.vue-flow__handle-left {
    top: 60%;
    left: 0;
    transform: translate(-50%, -50%);
}

.hl__left {
    position: absolute;
    transform: translate(40%, -30%);
    user-select: none;
}

</style>