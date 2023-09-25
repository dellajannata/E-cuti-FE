<template>
    <CreatePegawai />
</template>

<script setup>
import CreatePegawai from '../components/CreatePegawaiDinas.vue'

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'sidebar-dinas'
})
</script>