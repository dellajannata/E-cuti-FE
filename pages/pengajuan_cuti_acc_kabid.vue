<template>
    <CutiAccKabid />
  </template>
  <script setup>
  import CutiAccKabid from '../components/data_by_status/PengajuanCutiAccKabid.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-role'
  })
  </script>