<template>
    <CreateCutiKasubag />
</template>

<script setup>
import CreateCutiKasubag from '../components/CreateCutiKasubag.vue';

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'sidebar-kasubag'
})
</script>