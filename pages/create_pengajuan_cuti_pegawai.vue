<template>
    <CreateCutiPegawai />
</template>

<script setup>
import CreateCutiPegawai from '../components/CreateCutiPegawai.vue';

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'sidebar-role'
})
</script>