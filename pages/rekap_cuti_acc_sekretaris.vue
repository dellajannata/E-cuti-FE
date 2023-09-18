<template>
    <RekapCutiSekretaris />
</template>

<script setup>
import RekapCutiSekretaris from '../components/DataRekapCutiSelesai.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-sekretaris']
})
</script>