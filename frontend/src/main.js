// cSpell: disable
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VTreeview } from 'vuetify/labs/VTreeview'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components: {
        VTreeview,
        ...components
    },
    directives,
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

app.use(vuetify)

app.use(VueMonacoEditorPlugin, {
    paths: {
        // The recommended CDN config
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    },
})

app.use(createPinia())
app.use(router)

app.mount('#stdapi')
