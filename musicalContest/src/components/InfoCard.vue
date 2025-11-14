<template>
  <div
    class="col-span-1 p-6 rounded-xl border border-primary bg-white/10 backdrop-blur-md shadow-lg text-primary flex flex-col items-center gap-4"
  >
  <div :class="color" class="rounded-full flex justify-center items-center w-16 h-16">
    <font-awesome-icon v-if="icon" :icon="icon" class="text-2xl text-white p-4" />
  </div>
    <h3 class="text-2xl">{{ title }}</h3>
    <p class="text-center text-primary-light text-sm">{{ description }}</p>
  </div>
</template>


<script setup>
const { title, icon, description, color } = defineProps({
  title: { type: String, default: '' },
  icon: { type: [String, Array], default: null },
  description: { type: [String, Object], default: null },
  color: { type: String }
})
</script>
