<template>
    <ContentPegawai />
</template>

<script setup>
import ContentPegawai from '../components/ContentPegawai.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: 'sidebar-role'
})

</script>