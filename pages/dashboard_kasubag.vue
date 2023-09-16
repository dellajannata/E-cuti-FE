<template>
    <ContentKasubag />
</template>

<script setup>
import ContentKasubag from '../components/ContentKasubag.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-role']
})

</script>