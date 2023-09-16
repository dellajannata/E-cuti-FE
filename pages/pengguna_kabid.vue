<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaKabid.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-role']
})
</script>