<script setup lang="ts">
import { useModal, NModalProvider } from "naive-ui";
import HelloWorld from "./components/HelloWorld.vue";
import QQ from "./components/qq/index.vue";
// const usemodal = useModal();
// window.$usemodal = usemodal;
</script>

<template>
  <!-- <HelloWorld /> -->
  <n-modal-provider>
    <QQ />
  </n-modal-provider>
</template>

<style>
#app{
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
