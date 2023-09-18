<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaAdmin.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['default']
})
</script>