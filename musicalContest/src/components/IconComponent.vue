<template>
  <div class="rounded-full flex justify-center items-center">
    <font-awesome-icon v-if="icon" :icon="icon" class="w-4 h-4 sm:w-6 sm:h-6" />
  </div>
</template>

<script setup>
const { icon } = defineProps({
  icon: { type: [String, Array], default: null },
})
</script>
