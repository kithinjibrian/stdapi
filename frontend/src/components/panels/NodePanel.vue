<script setup>
import { ref } from 'vue';
import { useNodeStore } from '@/stores/nodes';

const nodeStore = useNodeStore();

const nodes = ref([
    {
        title: 'Code view',
        value: 'code-view',
        add: () => {
            nodeStore.add_node('codeview');
        }
    },
    {
        title: 'Viewset Output',
        value: 'viewset-output',
        add: () => {
            nodeStore.add_node('viewset');
        }
    },  
    {
        title: 'Model Class',
        value: 'model-class',
        add: () => {
            nodeStore.add_node('model');
        }
    }, 
    {
        title: 'Model Field',
        value: 'model-field',
        add: () => {
            nodeStore.add_node('field');
        }
    },
    {
        title: 'Attributes',
        value: 'attributes',
        add: () => {
            nodeStore.add_node('attributes');
        }
    }
])

const add_node = (e) => {
    e.add();
}

</script>

<template>
    <v-card flat>
        <v-card-title>
            Node Panel
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-text-field 
            clearable 
            label="Search for nodes" 
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"></v-text-field>
            <v-sheet class="scrollable-list" flat>
                <v-list>
                    <v-list-item
                    v-for="(item, i) in nodes"
                    :key="i"
                    :value="item"
                    variant="plain"
                    @click="add_node(item)"
                    >                        
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.scrollable-list {
  height: 67vh;
  overflow-y: auto;
  padding-right: 8px;
}
</style>
