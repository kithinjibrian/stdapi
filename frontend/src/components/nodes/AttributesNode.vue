<script setup>
import { Position, Handle, useVueFlow} from '@vue-flow/core'
import TemplateNode from '@/components/nodes/TemplateNode.vue';

import { ref, computed } from 'vue';

import { useEventBus } from '@/stores/ebus';
const eventBus = useEventBus();

const props = defineProps(['id', 'data']);
const { updateNodeData } = useVueFlow();

const code_gen = (data) => {
    return `${data.attribute_name}=${data.attribute_value}`;
}

const update_node_data = (id, data) => {
    data['code'] = code_gen(data);
    eventBus.emit(id, data);
    updateNodeData(id, data);
}

const attribute_name = computed({
    get: () => props.data.attribute_name,
    set: (value) => {
        update_node_data(props.id, {...props.data, type: "attribute", id: props.id, attribute_name: value });
    }
});

const attribute_value = computed({
    get: () => props.data.attribute_value,
    set: (value) => {
        update_node_data(props.id, {...props.data, type: "attribute", id: props.id, attribute_value: value });
    }
});

</script>

<template>
    <TemplateNode
    name="Attributes"
    type="attributes">
        <template v-slot:inputs>
            <div class="mt-4">
                <v-text-field
                v-model="attribute_name"
                density="compact"
                variant="outlined"
                label="name"/>
                <v-text-field
                v-model="attribute_value"
                density="compact"
                variant="outlined"
                label="value"/>
            </div>
        </template>
        <template v-slot:handles="{ hide }">
            <Handle id="attribute-attribute-1" type="source" :position="Position.Right">
                <div v-if="!hide" class="hl__right">
                    attribute
                </div>   
            </Handle>
        </template>
    </TemplateNode>
</template>

<style scoped>

.vue-flow__handle-right {
  top: 31%;
  right: 0;
  transform: translate(50%, -50%);
}

.hl__right {
    position: absolute;
    transform: translate(-110%, -27%);
    user-select: none;
}

</style>