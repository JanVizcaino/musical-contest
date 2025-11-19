<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-5xl">{{ stat }}</h1>
    <p>{{ title }}</p>
  </div>
</template>

<script setup>
const { stat, title } = defineProps({
  stat: { type: String, default: '' },
  title: { type: [String, Object], default: null },
})
</script>
