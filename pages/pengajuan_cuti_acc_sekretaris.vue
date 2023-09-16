<template>
    <CutiAccSekretaris />
  </template>
  
  <script setup>
  import CutiAccSekretaris from '../components/data_by_status/PengajuanCutiAccSekretaris.vue';
  
  definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-role'
  })
  </script>