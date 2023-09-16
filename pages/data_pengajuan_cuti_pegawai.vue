<template>
  <DataPengajuanCuti />
</template>
  
  <script setup>
  import DataPengajuanCuti from '../components/DataPengajuanCuti.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-role'
  })
  </script>