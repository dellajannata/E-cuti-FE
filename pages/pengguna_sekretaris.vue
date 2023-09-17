<template>
    <Pengguna />
</template>
  
<script setup>
import Pengguna from '../components/PenggunaSekretaris.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-sekretaris']
})
</script>