<template>
    <DataPegawaiDinas />
</template>

<script setup>
import DataPegawaiDinas from '../components/DataPegawaiDinas.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-dinas']
})
</script>