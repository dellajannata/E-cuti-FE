<template>
    <RekapCutiKadis />
</template>

<script setup>
import RekapCutiKadis from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-role'
})
</script>