<template>
    <CreateUnitKerja/>
</template>

<script setup>
import CreateUnitKerja from '../components/CreateUnitKerja.vue'

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'default'
})
</script>