<script setup>
import EditorTab from '@/components/tabs/EditorTab.vue';
import { ref, watch, onMounted, shallowRef } from 'vue';
import { useTabsStore } from '@/stores/tabs';
import { useFileStore } from '@/stores/file';

const tabs = useTabsStore();
const fileStore = useFileStore();

const active = ref(null);
const search = ref(null)
const caseSensitive = ref(false)

const init_open = fileStore.files ? [fileStore.files[0].id] : null
const initiallyOpen = ref(init_open)

const file_icons = ref({
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    json: 'mdi-code-json',
    md: 'mdi-language-markdown',
    pdf: 'mdi-file-pdf-box',
    png: 'mdi-file-image',
    txt: 'mdi-file-document-outline',
    xls: 'mdi-file-excel',
    c: 'mdi-language-c',
    "x-csrc": 'mdi-language-c',
    cpp: 'mdi-language-cpp',
    py: 'mdi-language-python',
    'x-python': 'mdi-language-python',
    jpeg: 'mdi-file-image',
})

const lang = ref({
    html: 'html',
    js: 'javascript',
    json: 'json',
    md: 'markdown',
    c: 'c',
    "x-csrc": 'c',
    cpp: 'cpp',
    py: 'python',
    'x-python': 'python',
})

const get_icon = (file, type) => {
    if(file_icons.value[file] == undefined) {
        if(type == 'image')
            return 'mdi-file-image'
        else if(type == 'text')
            return 'mdi-file-document-outline'
    } else {
        return file_icons.value[file]
    }
}

const filterFn = function (value, search, item) {
    return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

watch(active, async (new_value, old_value) => {

    if(new_value[0] == undefined) {
        new_value = old_value;
    }

    let file = fileStore.get_file(new_value[0]);
    
    if('file' in file) {
        if(!('buffer' in file)) {
            fileStore.fetch_file_content(file)
            .then(() => {
                tabs.addTab({
                    id: file.id,
                    title: file.title,
                    type: 'editor',
                    tab: shallowRef(EditorTab),
                    props: {
                        buffer: file.buffer,
                        language: lang[file.file],
                        path: file.full_path
                    },
                    update_value: (value) => {
                        fileStore.update_buffer(file, value);
                    }
                })
            });
        }
    }
})

onMounted(() => {
    fileStore.fetch_files();
})

</script>

<template>
    <v-card title="File Explorer" flat>
        <v-card-text>
            <v-text-field 
            v-model="search"
            clearable 
            label="Search for files/folders" 
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"></v-text-field>
         <v-divider/>
         <v-sheet class="scrollable-list" flat>
            <v-treeview
                v-if="fileStore.files"
                v-model:activated="active"
                :items="fileStore.files"
                activatable
                open-on-click
                transition
                :search="search"
                item-title="title"
                item-value="id"
                :load-children="fileStore.fetch_file"
                :opened="initiallyOpen"
                :custom-filter="filterFn"
            >
                <template v-slot:prepend="{ item, isOpen }">
                <v-icon v-if="!item.file">
                    {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ get_icon(item.file, item.type) }}
                </v-icon>
                </template>
            </v-treeview>
         </v-sheet>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.scrollable-list {
  height: 69vh;
  overflow-y: auto;
  padding-right: 8px;
}
</style>

