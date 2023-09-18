<template>
    <DataPengajuanCutiAdmin />
</template>
  
  <script setup>
  import DataPengajuanCutiAdmin from '../components/DataPengajuanCutiAdmin.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route']
  })
  </script>