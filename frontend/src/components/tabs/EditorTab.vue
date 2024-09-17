<script setup>
import { ref } from 'vue'

defineProps({
    language: {
        type: String,
        default: 'python'
    },
    buffer: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: ''
    }
})

const value = ref("console.log()");

const editorOptions = ref({
      theme: 'vs-dark',
      automaticLayout: true,
});

const emit = defineEmits(['update:value']);

function onEditorChange(newValue) {
    emit('update:value', newValue);
}

</script>

<template>
    <v-sheet height="81vh">
        <div class="mb-2">
        {{ path }}
        </div>
        <vue-monaco-editor
        :value="buffer"
        :language="language"
        :options="editorOptions"
        @change="onEditorChange"/> 
    </v-sheet>
</template>
