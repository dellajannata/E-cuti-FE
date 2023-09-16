<template>
    <RekapCutiSekretaris />
</template>

<script setup>
import RekapCutiSekretaris from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
})
</script>