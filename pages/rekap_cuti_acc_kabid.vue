<template>
    <RekapCutiKabid />
</template>

<script setup>
import RekapCutiKabid from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-kabid']
})
</script>