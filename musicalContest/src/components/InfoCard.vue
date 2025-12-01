<template>
  <div
    class="col-span-1 sm:col-span-2 md:col-span-1 p-4 sm:p-6 rounded-xl border border-primary bg-white/10 backdrop-blur-md shadow-lg text-primary flex flex-col items-center gap-3 sm:gap-4"
  >
    <IconComponent :icon="icon" class="w-12 h-12 sm:w-16 sm:h-16 text-2xl text-white" :class="iconBg"/>
    <h3 class="text-lg sm:text-2xl text-center">{{ title }}</h3>
    <p class="text-center text-primary-light text-xs sm:text-sm">{{ description }}</p>
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
