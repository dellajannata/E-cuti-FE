<template>
    <ContentKadis />
</template>

<script setup>
import ContentKadis from '../components/ContentKadis.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-role']
})

</script>