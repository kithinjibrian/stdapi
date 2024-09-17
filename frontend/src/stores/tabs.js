// cSpell: disable

import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [],
        activeTab: null
    }),
    actions: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        addTab(tab) {
            let bool = this.tabs.find(t => t.id == tab.id);

            if (bool) {
                this.activeTab = tab;
                return;
            }

            if (!('props' in tab))
                tab.props = {};

            this.tabs.push(tab);
            this.activeTab = tab;
        },
        removeTab(id) {
            const index = this.tabs.findIndex(obj => obj.id === id);

            if (index !== -1) {
                this.tabs.splice(index, 1);

                if (index == 0)
                    this.activeTab = this.tabs[index];
                else
                    this.activeTab = this.tabs[index - 1];
            }

            if (this.tabs.length == 0)
                this.activeTab = null;
        }
    },
})
