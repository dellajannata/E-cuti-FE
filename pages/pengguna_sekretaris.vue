<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaSekretaris.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-sekretaris']
})
</script>