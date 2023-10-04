<template>
  <DataPengajuanCuti />
</template>
  
  <script setup>
  import DataPengajuanCuti from '../components/DataPengajuanCutiKasubag.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-kasubag'
  })
  </script>