<template>
    <Content />
</template>
  
<script setup>
import Content from '../components/Content.vue';

definePageMeta({
  middleware: ['redirect-login', 'protect-route']
})
</script>