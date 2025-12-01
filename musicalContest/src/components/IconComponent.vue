<template>
  <div class="rounded-full flex justify-center items-center">
    <font-awesome-icon v-if="icon" :icon="icon" />
  </div>
</template>

<script setup>
const { icon } = defineProps({
  icon: { type: [String, Array], default: null },
})
</script>
