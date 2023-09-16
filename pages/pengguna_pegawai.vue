<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/Pengguna.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-role']
})
</script>