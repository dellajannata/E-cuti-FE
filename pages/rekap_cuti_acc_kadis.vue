<template>
    <RekapCutiKadis />
</template>

<script setup>
import RekapCutiKadis from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
})
</script>