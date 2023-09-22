<template>
    <DataUnitKerja />
</template>

<script setup>
import DataUnitKerja from '../components/DataUnitKerja.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route']
})
</script>