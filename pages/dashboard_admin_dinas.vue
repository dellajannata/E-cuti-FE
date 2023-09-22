<template>
    <ContentAdminDinas />
</template>
  
<script setup>
import ContentAdminDinas from '../components/ContentAdminDinas.vue';

definePageMeta({
  middleware: ['redirect-login', 'protect-route'],
  layout: ['sidebar-dinas']
})
</script>