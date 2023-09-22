<template>
    <PenggunaAdminDinas />
</template>
  
<script setup>
import PenggunaAdminDinas from '../components/PenggunaAdminDinas.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-dinas']
})
</script>