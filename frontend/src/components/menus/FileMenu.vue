<script setup>
import { ref, shallowRef } from 'vue'
import FileUpload from './FileUpload.vue'
import FolderUpload from './FolderUpload.vue'

const items = ref([
    { 
        title: 'New File',
        component: shallowRef(FileUpload) 
    },
    { 
        title: 'Open Folder',
        component: shallowRef(FolderUpload) 
    },
])

</script>

<template>
    <v-menu activator="parent">
      <v-list
      persistent>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
            <component :is="item.component"/>
        </v-list-item>
      </v-list>
    </v-menu>
</template>