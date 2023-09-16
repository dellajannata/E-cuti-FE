<template>
    <ContentKabid />
</template>

<script setup>
import ContentKabid from '../components/ContentKabid.vue';

definePageMeta({
    middleware: ['redirect-login'],
    layout: ['sidebar-role']
})

</script>