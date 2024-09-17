// cSpell: disable

import { defineStore } from 'pinia'

function generateUUID() {
    if (crypto && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const useNodeStore = defineStore('node', {
    state: () => ({
        nodes: [],
        edges: [],
    }),
    getters: {
        get_node: (state) => {
            return (id) => {
                return state.nodes.find(node => node.id === id);
            }
        },
        get_nodes: (state) => {
            return state.nodes;
        },
        get_edges: (state) => {
            return state.edges;
        }
    },
    actions: {
        add_node(type) {
            const random = () => {
                return 50 + Math.floor(Math.random() * 100)
            }
            this.nodes.push({ id: generateUUID(), type, position: { x: 100 + random(), y: 100 + random() } });
        }
    }
})