<template>
  <router-link
    v-if="to"
    :to="to"
    :class="[
      'flex items-center gap-2 px-5 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out',
      isActive ? 'bg-white text-secondary' : '',
    ]"
  >
    <IconComponent :icon="icon" />
    <span v-if="label"
      ><slot>{{ label }}</slot></span
    >
  </router-link>

  <button
    v-else
    class="flex justify-center items-center gap-2 px-5 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
  >
    <IconComponent :icon="icon" />
    <span v-if="label"
      ><slot>{{ label }}</slot></span
    >
  </button>
</template>

<script setup>
import { computed } from 'vue' // Importamos "computed" para crear propiedades reactivas calculadas
import { useRoute } from 'vue-router' // Importamos "useRoute" para acceder a la ruta actual del navegador
import IconComponent from './IconComponent.vue'

// Definimos las propiedades que el componente recibirá desde el padre (Header)
const { label, icon, to } = defineProps({
  label: { type: String, default: null },
  icon: { type: [String, Array], default: null },
  to: { type: [String, Object], default: null },
})

// Obtenemos la información de la ruta actual
const route = useRoute()

// Computed que nos dice si el botón está activo (es decir, si la ruta del botón coincide con la actual)
const isActive = computed(() => to && route.path === to)
</script>
