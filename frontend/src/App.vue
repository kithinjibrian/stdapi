<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import SystemBar from './components/bars/SystemBar.vue';
import PrimaryBar from './components/bars/PrimaryBar.vue';
import StatusBar from './components/bars/StatusBar.vue';

</script>

<template>
    <v-app id="inspire">
        <SystemBar/>
        <StatusBar/>
        <v-main>
            <PrimaryBar/>
            <RouterView/>
        </v-main>
    </v-app>
</template>