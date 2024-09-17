<script setup>
// cSpell: disable
import { ref } from 'vue';
import { Position, Handle } from '@vue-flow/core'

import { useEventBus } from '@/stores/ebus';
import { useNodeStore } from '@/stores/nodes';

const eventBus = useEventBus();
const nodesStore = useNodeStore();

////////////////////////////////////
////// styling ////////////////////

const hide = ref(false);
const info = ref(false);
const transparent = ref(false);

const props = defineProps({
    id:{
        typeof: String,
        default: '',
    },
    name: {
        typeof: String,
        default: '',
    },
    type: {
        typeof: String,
        default: '',
    },
    docs: {
        type: String,
        default: 'node',
    },
    cb: {
        type: Function,
        default: () => {},
    },
    width: {
        type: Number,
        default: 200,
    },

})

const css = `
.vue-flow__node-${props.type} {
    width: ${props.width}px;
    border: 1px solid var(--vf-node-color);
}

.vue-flow__node-${props.type}.selected, 
.vue-flow__node-${props.type}:focus, 
.vue-flow__node-${props.type}:focus-visible {
  outline: none;
  border: 1px solid #7700ff;
}

.vue-flow__node-${props.type}.selected, 
.vue-flow__node-${props.type}.selected:hover {
  box-shadow: 0 0 0 0.5px var(--vf-box-shadow);
}

.vue-flow__node-${props.type} {
  --vf-handle:#7700ff;
  --vf-box-shadow:#7700ff;
}
`;

const style = "style";

//////////////////////////////
</script>

<template>
  <div>
    <component :is="style" v-html="css"></component>
    <v-card
    @mouseenter="transparent = true"
    @mouseleave="transparent = false" 
    flat>
        <v-tooltip
        v-model="info"
        activator="parent"
        location="top"
        :open-on-hover="false"
        >
        <div style="white-space: pre" v-html="docs"></div>
        <v-divider color="black"></v-divider>
        <div>
            <p>DEBUG: on</p>
            <p>NODE_ID: {{ id }}</p>
        </div>
        </v-tooltip>
        <template v-slot:title>
            <span>{{ name }}</span>
        </template>
        <template
        v-if="transparent" 
        v-slot:append>
            <v-icon 
            class="pointer mr-2"
            icon="mdi-delete"></v-icon>
            <v-icon 
            class="pointer" 
            icon="mdi-content-duplicate"></v-icon>
        </template>
        <template 
        v-slot:prepend>
            <v-icon
            class="pointer mr-1"
            :icon=" hide ? 'mdi-chevron-down' : 'mdi-chevron-up'"
            @click="hide = !hide"
            ></v-icon>
            <v-icon
            class="chelp" 
            icon="mdi-information" 
            @click="info = true"
            @mouseleave="info = false"></v-icon>
        </template>
        <v-divider></v-divider>
        <v-card-text
        :style="{ display: hide ? 'none' : 'block' }">
            <slot name="inputs"></slot>
        </v-card-text>
    </v-card>
    <!-- handles -->
    <slot name="handles" :hide="hide"></slot>
    <!-- handles -->
  </div>
</template>

<style>

:root {
  --vf-node-bg: #121212;
  --vf-node-color: #3c3c3c;
  --vf-node-text: #e9e9e9;
  --vf-box-shadow: #000;
}

.vue-flow__node {
  padding: 0;
  width: 200px;
}

.vue-flow__handle {
  width: 13px;
  height: 13px;
  border-radius: 100%;
}

.pointer {
    cursor: pointer;
}

.chelp {
    cursor: pointer;
}
</style>