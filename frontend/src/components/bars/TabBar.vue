<script setup>
import { ref } from 'vue';
import { useTabsStore } from '@/stores/tabs';
import { useFileStore } from '@/stores/file';
import { usePrimaryBarStore } from '@/stores/pbar';

const tabStore = useTabsStore();
const fileStore = useFileStore();
const barStore = usePrimaryBarStore();

const tab = ref(null);

function closeTab(value) {

    const tab = tabStore.tabs.find(obj => obj.id === value);

    if('icon_id' in tab) {
        barStore.remove_icon(tab.icon_id);
    }

    tabStore.removeTab(value);
}

const emit = defineEmits(['update:value']);

function changeTab(value) {
/**
 * dirty fix
 */
  if(value.type == "editor")
  {
    let file = fileStore.get_file(value.id);
    value.props.buffer = file.buffer;
  }
}

</script>

<template>
    <div>
    <v-tabs
      v-model="tabStore.activeTab"
      :items="tabStore.tabs"
      @update:model-value="changeTab"
    >
        <template v-slot:tab="{ item }">
            <v-tab
            :text="item.title"
            :value="item"
            class="text-none"
            >
                <template v-slot:append>
                <v-icon
                icon="mdi-close"
                @click.stop="closeTab(item.id)"
                />
                </template>
            </v-tab>
        </template>
    </v-tabs>
    <div>
       <component
       :key="tabStore.activeTab.id" 
       :is="tabStore.activeTab.tab"
       v-bind="tabStore.activeTab.props"
       @update:value="tabStore.activeTab.update_value"/>
    </div>
    </div>
</template>
