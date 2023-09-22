<template>
    <CreateJabatan/>
</template>

<script setup>
import CreateJabatan from '../components/CreateJabatan.vue'

definePageMeta({
  middleware: ['redirect-login'],
  layout: 'default'
})
</script>