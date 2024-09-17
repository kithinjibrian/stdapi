// cSpell: disable

import { defineStore } from 'pinia'

export const usePrimaryBarStore = defineStore('pbar', {
    state: () => ({
        showBar: true,
        activeBar: null,
        previousBar: null,
        showDrawer: true,
        location: "right",
        icons: []
    }),
    actions: {
        set_active_bar(component) {
            this.activeBar = component;
        },
        set_previous_bar(component) {
            this.previousBar = component;
        },
        push_icon(icon) {
            const obj = this.icons.find(obj => obj.id === icon.id);

            if (obj == undefined) {
                this.icons.push(icon);
            }
        },
        remove_icon(id) {
            const index = this.icons.findIndex(obj => obj.id === id);
            if (index !== -1) {
                if (this.activeBar == this.icons[index].component) {
                    this.activeBar = this.previousBar;
                }
                this.icons.splice(index, 1);
            }
        }
    }
})