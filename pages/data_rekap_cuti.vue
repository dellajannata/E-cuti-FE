<template>
    <DataRekapCuti />
</template>

<script setup>
import DataRekapCuti from '../components/DataRekapCuti.vue';

definePageMeta({
  middleware: ['redirect-login']
})
</script>