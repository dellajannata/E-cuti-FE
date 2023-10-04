<template>
    <CreateCutiSekretaris />
</template>

<script setup>
import CreateCutiSekretaris from '../components/CreateCutiSekretaris.vue';

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'sidebar-sekretaris'
})
</script>