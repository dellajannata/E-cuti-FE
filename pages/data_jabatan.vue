<template>
    <DataJabatan />
</template>

<script setup>
import DataJabatan from '../components/DataJabatan.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route']
})
</script>