<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaAdmin.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['default']
})
</script>