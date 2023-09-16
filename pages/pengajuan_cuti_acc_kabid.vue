<template>
    <CutiAccKabid />
  </template>
  <script setup>
  import CutiAccKabid from '../components/data_by_status/PengajuanCutiAccKabid.vue';
  
  definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
  })
  </script>