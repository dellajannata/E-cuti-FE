<template>
    <CutiAccKasubagUmum />
  </template>

  <script setup>
  import CutiAccKasubagUmum from '../components/data_by_status/PengajuanCutiAccKasubagUmum.vue';
  
  definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-kasubag']

  })
  </script>