<template>
  <div class="flex flex-col w-full mb-4">
    <label
      v-if="label"
      class="mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <div class="relative w-full">
      <!-- Icono responsive -->
      <span
        v-if="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg"
      >
        <IconComponent :icon="icon" />
      </span>

      <!-- INPUT RESPONSIVE -->
      <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="
          w-full
          text-gray-600
          pl-10 pr-3 py-2
          rounded-md shadow-md
          bg-white
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
          text-sm sm:text-base    <!-- tamaño mejora en pantallas medianas -->
        "
      />
    </div>
  </div>
</template>


<script setup>
import IconComponent from './IconComponent.vue'

defineProps({
  modelValue: { type: String },
  placeholder: { type: String, default: '' },
  icon: { type: [String, Array], default: null },
  label: { type: String, default: '' },
})
</script>
