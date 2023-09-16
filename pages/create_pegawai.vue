<template>
    <CreatePegawai />
</template>

<script setup>
import CreatePegawai from '../components/CreatePegawai.vue'

definePageMeta({
  middleware: ['redirect-login', 'protect-route'],
  layout: 'default'
})
</script>