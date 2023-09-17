<template>
    <RekapCutiKasubag />
</template>

<script setup>
import RekapCutiKasubag from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-kasubag']
})
</script>