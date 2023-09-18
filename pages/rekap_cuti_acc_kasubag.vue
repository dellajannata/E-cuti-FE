<template>
    <RekapCutiKasubag />
</template>

<script setup>
import RekapCutiKasubag from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-kasubag']
})
</script>