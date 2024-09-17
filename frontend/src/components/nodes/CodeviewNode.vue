<script setup>
// cSpell: ignore viewset codeview
import { Position, Handle, useVueFlow } from '@vue-flow/core'
import TemplateNode from '@/components/nodes/TemplateNode.vue';

import { ref, onMounted, readonly } from 'vue';

const docs = `Creates a viewset class.
<b>@input model</b> - A model class.  
<b>@input serializer</b> - a 
serializer class.
<b>@output model</b> - an object
with the model name and an 
array of associated fields.
`;

/////////////

const value = ref("console.log()");

const editorOptions = ref({
      theme: 'vs-dark',
      automaticLayout: true
});


//////////////

const props = defineProps(['id', 'data']);
const { updateNodeData, findNode } = useVueFlow();

const code = ref(null);

const cb = (data) => {
    if('code' in data) {
        code.value = data.code;
    }
};

onMounted(() => {
    props.data.cb = cb;
})

</script>

<template>
  <TemplateNode
    name="CodeView"
    type="codeview"
    :width="500"
    :docs="docs"
    :id="id">
    <template v-slot:inputs>
        <v-sheet height="50vh">
            <vue-monaco-editor
            :value="code"
            language="python"
            :options="editorOptions"/>
        </v-sheet>
    </template>
    <template v-slot:handles>
        <Handle 
        id="model-viewset-1"
        type="target" 
        :position="Position.Left"> 
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