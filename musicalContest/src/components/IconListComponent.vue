<template>
    <div class="flex items-center gap-2">
        <IconComponent :icon="icon" class="bg-secondary/50 text-secondary w-8 h-8"/>
        <p class="text-primary">{{ text }}</p>
    </div>
</template>

<script setup>
import IconComponent from './IconComponent.vue';

const { icon, text } = defineProps({
  icon: { type: [String, Array], default: null },
  text: { type: String },
})
</script>
