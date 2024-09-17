<script setup>
import { ref } from 'vue'
import TabBar from '@/components/bars/TabBar.vue';
import { useTabsStore } from '@/stores/tabs';
import { useFileStore } from '@/stores/file';

const files = ref([]);
const folders = ref([]);
const tabs = useTabsStore();
const fileStore = useFileStore();

const formatTree = (tree) => {
    const f_tree = [];

    for (let key in tree) {
        const item = tree[key];

        if('file' in item)
        {
           f_tree.push({
               id: item.id,
               title: item.name,
               type: item.type,
               file: item.file,
               size: item.size,
               raw_file: item.raw_file,
           }); 
        } else {
            f_tree.push({
                id: item.id,
                title: item.name,
                raw_file: item.raw_file,
                children: formatTree(item.children)
            });
        }
    }

    return f_tree;
}

const build_tree = (files) => {
    const tree = {};

    let id = 0;

    files.forEach(file => {
        const path_parts = file.webkitRelativePath.split('/');
        let current = tree;

        path_parts.forEach((part, index) => {
            id++;

            if (index == path_parts.length - 1) {
                if (!current[part]) {
                    let [type, subtype] = file.type.split('/');
                    current[part] = { id, name: part, type: type, file: subtype, size: file.size, raw_file: file };
                }
            } else {
                if (!current[part]) {
                    current[part] = { id, name: part, children: {}, raw_file: file };
                }

                current = current[part].children;
            }
        });
    })

    return formatTree(tree);
}

const handleFolderSelection = () => {
    let tree = build_tree(folders.value);
    fileStore.set_file(tree);
    console.log(tree)

    
}

const handleFileSelection = () => {
    console.log(files.value);
}

</script>

<template>
    <div>
        <div v-if="tabs.activeTab == null">
            <h1>Home</h1>
        </div>
        <TabBar v-else/>

<!--
    Hidden components
-->
        <div style="display: none;">
            <v-file-input
            v-model="folders"
            id="folderInput"
            variant="outlined"
            multiple
            webkitdirectory
            mozdirectory
            style="display: none;"
            @change="handleFolderSelection">
            </v-file-input>

            <v-file-input
            v-model="files"
            id="fileInput"
            style="display: none;" 
            variant="outlined"
            @change="handleFileSelection">
            </v-file-input>
        </div>
    </div> 
</template>