<template>
  <router-link
    v-if="to"
    :to="to"
    :class="buttonClasses"
  >
    <font-awesome-icon v-if="icon" :icon="icon" />
    <span><slot>{{ label }}</slot></span>
  </router-link>

  <button v-else :class="buttonClasses">
    <font-awesome-icon v-if="icon" :icon="icon" />
    <span><slot>{{ label }}</slot></span>
  </button>
</template>

<script setup>
import { computed } from 'vue' 
import { useRoute } from 'vue-router'

const props = defineProps({
  label: { type: String, default: '' },
  icon: { type: [String, Array], default: null },
  to: { type: [String, Object], default: null },
  variant: { type: String, default: 'primary' }
})

const route = useRoute()

const isActive = computed(() => {
  if (!props.to) return false
  // Compara con la ruta actual (ajusta según necesitas)
  return route.path === (typeof props.to === 'string' ? props.to : props.to.path)
})

const buttonClasses = computed(() => {
  const base = 'flex items-center gap-2 px-5 py-2.5 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
  // Si está activo fuerzo primary, si no uso variant
  const color = isActive.value
    ? 'bg-primary hover:bg-primary-dark'
    : (props.variant === 'secondary' ? 'bg-secondary hover:bg-secondary-dark' : 'bg-primary hover:bg-primary-dark')

  return `${base} ${color}`
})
</script>
