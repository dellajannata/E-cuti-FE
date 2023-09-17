<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaKasubag.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-kasubag']
})
</script>