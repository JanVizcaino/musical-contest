<template>
  <button
    class="group w-full p-4 flex items-center justify-between bg-gray-50 border-2 border-gray-100 rounded-xl transition-all duration-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    :class="{ 'bg-primary-light/10 border-primary': isSelected }"
    @click="$emit('select')"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
        :class="
          isSelected
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-500 group-hover:bg-primary group-hover:text-white'
        "
      >
        {{ letter }}
      </div>
      <span class="text-primary-dark font-medium text-left">{{ text }}</span>
    </div>

    <IconComponent v-if="isSelected" icon="check" class="text-primary" />
  </button>
</template>

<script setup>
import IconComponent from '@/components/IconComponent.vue' // Asumo que existe

defineProps({
  text: {
    type: String,
    required: true,
  },
  letter: {
    type: String, // A, B, C, D
    default: 'A',
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>
