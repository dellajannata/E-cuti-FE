<template>
    <CreateCutiPegawai />
</template>

<script setup>
import CreateCutiPegawai from '../components/CreateCutiPegawai.vue';

definePageMeta({
  middleware: ['redirect-login', 'protect-route'],
  layout: 'sidebar-role'
})
</script>