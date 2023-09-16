<template>
    <RekapCutiPegawai />
</template>

<script setup>
import RekapCutiPegawai from '../components/DataRekapCutiPegawai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
})
</script>