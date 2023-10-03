<template>
    <CreateCutiKabid />
</template>

<script setup>
import CreateCutiKabid from '../components/CreateCutiKabid.vue';

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'sidebar-kabid'
})
</script>