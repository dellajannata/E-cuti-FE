<template>
    <DataPegawai />
</template>

<script setup>
import DataPegawai from '../components/DataPegawai.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route']
})
</script>