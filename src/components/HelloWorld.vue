<script setup lang="ts">
import { initScene} from 'czm-sdk';
import cc from 'czm-sdk';
console.log(cc);
const div: HTMLDivElement = document.createElement('div');
div.id = 'earth';
div.style.width = '80vw';
div.style.height = '80vh';
document.getElementById('app')?.appendChild(div);
// document.body.appendChild(div);
let viewer = initScene(div);
console.log(viewer);
</script>

<template>
  <!-- <div id="earth"></div> -->
  <w-comp />
</template>

<style scoped></style>
