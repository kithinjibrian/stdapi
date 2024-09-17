<script setup>

const openFileDialog = () => {    
  document.querySelector('#folderInput').click()
}

</script>

<template>
    <div>
        <h3
        id="h"
        @click="openFileDialog">Open Folder</h3>
    </div>
</template>

<style scoped>
#h {
    cursor: pointer;
}
</style>