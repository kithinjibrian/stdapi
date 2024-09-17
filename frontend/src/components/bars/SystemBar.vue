<script setup>
import FileMenu from '@/components/menus/FileMenu.vue';
</script>

<template>
    <v-app-bar
    flat
    border
    density="compact">
        <v-btn>
            File
            <FileMenu/>
        </v-btn>
        <v-btn>Edit</v-btn>
    </v-app-bar>
</template>