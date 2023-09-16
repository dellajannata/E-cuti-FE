<template>
    <ContentKabid />
</template>

<script setup>
import ContentKabid from '../components/ContentKabid.vue';

definePageMeta({
    middleware: ['redirect-login', 'protect-route'],
    layout: ['sidebar-role']
})

</script>