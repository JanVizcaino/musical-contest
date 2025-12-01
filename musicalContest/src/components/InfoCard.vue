<template>
  <div
    class="col-span-1 p-6 rounded-xl border border-primary bg-white/10 backdrop-blur-md shadow-lg text-primary flex flex-col items-center gap-4"
  >
    <IconComponent :icon="icon" class="w-16 h-16 text-2xl text-white" :class="iconBg"/>
    <h3 class="text-2xl">{{ title }}</h3>
    <p class="text-center text-primary-light text-sm">{{ description }}</p>
  </div>
</template>

<script setup>
import IconComponent from './IconComponent.vue'

const { title, icon, description, iconBg } = defineProps({
  title: { type: String, default: '' },
  icon: { type: [String, Array], default: null },
  description: { type: [String, Object], default: null },
  iconBg: { type: [String, Object], default: null },
})
</script>
