<template>
  <div class="flex items-center gap-1 sm:gap-2">
    <IconComponent 
      :icon="icon" 
      class="bg-secondary/50 text-secondary w-6 h-6 sm:w-8 sm:h-8"
    />
    <p class="text-sm sm:text-base text-primary truncate">{{ text }}</p>
  </div>
</template>


<script setup>
import IconComponent from './IconComponent.vue';

const { icon, text } = defineProps({
  icon: { type: [String, Array], default: null },
  text: { type: String },
})
</script>
