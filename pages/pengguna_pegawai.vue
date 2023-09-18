<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/Pengguna.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-role']
})
</script>