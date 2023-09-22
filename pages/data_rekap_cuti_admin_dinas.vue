<template>
    <DataRekapCutiAdminDinas />
</template>

<script setup>
import DataRekapCutiAdminDinas from '../components/DataRekapCutiAdminDinas.vue';

definePageMeta({
  middleware: ['redirect-login', 'protect-route'],
  layout: ['sidebar-dinas']
})
</script>