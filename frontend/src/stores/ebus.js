// cSpell: disable

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEventBus = defineStore('eventBus', () => {
    const events = ref({});

    // Emit an event
    function emit(event, payload) {
        if (events.value[event]) {
            events.value[event].forEach(callback => callback(payload));
        }
    }

    // Register a listener for an event
    function on(event, callback) {
        if (!events.value[event]) {
            events.value[event] = [];
        }
        events.value[event].push(callback);
    }

    function once(event, callback) {
        if (!events.value[event]) {
            events.value[event] = [callback];
        }
    }

    // Remove a listener for an event
    function off(event, callback) {
        if (events.value[event]) {
            events.value[event] = events.value[event].filter(cb => cb !== callback);
        }
    }

    return {
        emit,
        on,
        once,
        off,
    };
});
