<script setup lang="ts">
import { useStore, computed } from "@nuxtjs/composition-api";

const store = useStore<any>();

const count = computed(() => store.state.counter.count);
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="store.commit('counter/increment')">increment</button>
  </div>
</template>
