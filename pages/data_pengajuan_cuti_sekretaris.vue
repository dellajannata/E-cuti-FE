<template>
  <DataPengajuanCuti />
</template>
  
  <script setup>
  import DataPengajuanCuti from '../components/DataPengajuanCutiSekretaris.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-sekretaris'
  })
  </script>