<script setup>
import { ref, shallowRef } from 'vue';
import NewAppTab from '@/components/tabs/NewAppTab.vue';
import { useTabsStore } from '@/stores/tabs';
import { usePrimaryBarStore } from '@/stores/pbar';

import NodePanel from './NodePanel.vue';

const apps = ref([
    {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Contact',
        subtitle: 'This is a contact app',
    }
])

const tabs = useTabsStore()
const barStore = usePrimaryBarStore()

function open_new_app_tab()
{
    barStore.push_icon({ 
        id: 'node-editor', 
        icon: 'mdi-share-variant', 
        component: shallowRef(NodePanel)
    });

    barStore.set_previous_bar(barStore.activeBar);
    barStore.set_active_bar(shallowRef(NodePanel));
    
    tabs.addTab({
        id: 'new_app',
        title: 'Node Editor',
        icon_id: 'node-editor',
        tab: shallowRef(NewAppTab)
    });
}

</script>

<template>
    <v-card flat>
        <v-card-title>
            Create App
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-text-field 
            clearable 
            label="Search for apps" 
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"></v-text-field>
            <v-sheet class="scrollable-list" flat>
            <v-list
                :items="apps"
                lines="two"
                item-props
            >
                <template v-slot:subtitle="{ subtitle }">
                    <div v-html="subtitle"></div>
                </template>
            </v-list>
            </v-sheet>
            <v-btn
            block
            variant="outlined"
            color="success"
            @click="open_new_app_tab()">new app</v-btn>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.scrollable-list {
  height: 62vh;
  overflow-y: auto;
  padding-right: 8px;
}
</style>
