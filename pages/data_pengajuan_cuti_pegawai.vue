<template>
  <DataPengajuanCuti />
</template>
  
  <script setup>
  import DataPengajuanCuti from '../components/DataPengajuanCuti.vue';
  
  definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
  })
  </script>