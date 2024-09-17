<script setup>
import { ref, shallowRef } from 'vue';

import { usePrimaryBarStore } from '@/stores/pbar';

import Search from '@/components/panels/search.vue';
import CreateApp from '@/components/panels/CreateApp.vue';
import FileExplorer from '@/components/panels/FileExplorer.vue';


const barStore = usePrimaryBarStore();

barStore.push_icon({ 
    id: "create-app", 
    icon: 'mdi-plus', 
    component: shallowRef(CreateApp)
});

barStore.push_icon({ 
    id: "file-explorer", 
    icon: 'mdi-file', 
    component: shallowRef(FileExplorer)
});

barStore.push_icon({ 
    id: "search", 
    icon: 'mdi-magnify', 
    component: shallowRef(Search)
});

barStore.set_active_bar(shallowRef(CreateApp));

const toggleComponent = (component) => {
    if(barStore.activeBar === component) {
        barStore.showDrawer = false;
        barStore.set_active_bar(null);
    } else {
        barStore.showDrawer = true;
        barStore.set_active_bar(shallowRef(component));
    }
};
</script>

<template>
    <div>
        <v-navigation-drawer
            v-model="barStore.showBar"
            rail
            permanent
            :location="barStore.location"
        >
            <v-avatar
                v-for="(item) in barStore.icons"
                :key="item.id"
                class="d-block text-center mx-auto mt-4"
                size="32"
                @click="toggleComponent(item.component)"
            >
                <v-icon 
                :icon="item.icon" 
                size="x-large" 
                :color="item.component == barStore.activeBar ? 'white' : 'grey'"></v-icon>
            </v-avatar>

        </v-navigation-drawer>

        <v-navigation-drawer
            v-model="barStore.showDrawer"
            width="300"
            permanent
            :location="barStore.location"
        >
            <component :is="barStore.activeBar"/>
        </v-navigation-drawer>
    </div>
</template>
