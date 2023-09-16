<template>
    <ContentPegawai />
</template>

<script setup>
import ContentPegawai from '../components/ContentPegawai.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: 'sidebar-role'
})

</script>