<template>
    <CutiAccKadis />
  </template>

  <script setup>
  import CutiAccKadis from '../components/data_by_status/PengajuanCutiAccKadis.vue';
  
  definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
  })
  </script>