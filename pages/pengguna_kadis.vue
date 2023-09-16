<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaKadis.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-role']
})
</script>