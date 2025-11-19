<template>
  <div :class="color" class="rounded-full flex justify-center items-center">
    <font-awesome-icon v-if="icon" :icon="icon" />
  </div>
</template>

<script setup>
const { icon, color } = defineProps({
  icon: { type: [String, Array], default: null },
  color: { type: String },
})
</script>
