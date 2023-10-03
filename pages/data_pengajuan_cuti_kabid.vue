<template>
  <DataPengajuanCuti />
</template>
  
  <script setup>
  import DataPengajuanCuti from '../components/DataPengajuanCutiKabid.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-kabid'
  })
  </script>