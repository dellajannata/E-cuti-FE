<template>
    <DataPengajuanCutiAdminDinas />
</template>
  
  <script setup>
  import DataPengajuanCutiAdminDinas from '../components/DataPengajuanCutiAdminDinas.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-dinas']
  })
  </script>