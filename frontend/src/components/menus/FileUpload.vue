<script setup>

const openFileDialog = () => {
  document.querySelector('#fileInput').click()
}

</script>

<template>
    <div>
        <h3
        id="h"
        @click="openFileDialog">Open File</h3>
    </div>
</template>

<style scoped>
#h {
    cursor: pointer;
}
</style>