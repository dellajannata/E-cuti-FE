<template>
    <ContentKadis />
</template>

<script setup>
import ContentKadis from '../components/ContentKadis.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-role']
})

</script>