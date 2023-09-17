<template>
    <ContentSekretaris />
</template>

<script setup>
import ContentSekretaris from '../components/ContentSekretaris.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-sekretaris']
})

</script>