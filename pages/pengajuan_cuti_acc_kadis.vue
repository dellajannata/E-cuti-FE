<template>
    <CutiAccKadis />
  </template>

  <script setup>
  import CutiAccKadis from '../components/data_by_status/PengajuanCutiAccKadis.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-kadis']
  })
  </script>