<template>
  <div class="flex items-start flex-col mb-4">
    <label v-if="label" class="mb-1 text-sm font-medium text-gray-700">{{ label }}</label>
    
    <div class="relative w-full">
      <!-- Icono opcional -->
      <span v-if="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <IconComponent :icon="icon" />
      </span>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="inputValue"
        class="w-full text-gray-600 pl-10 pr-3 py-2 shadow-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import IconComponent from './IconComponent.vue';

const {placeholder, icon, label} = defineProps({
  placeholder: { type: String, default: '' }, 
  icon: { type: [String, Array], default: null }, 
  label: { type: String, default: '' } 
});

// Valor del input (reactivo)
const inputValue = ref('');
</script>
