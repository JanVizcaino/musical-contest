<!-- Componente de opción-->
<template>
  <button
    class="
      group w-full p-4 flex items-center justify-between gap-3
      bg-gray-50 border-2 rounded-xl
      transition-all duration-200
      hover:border-primary hover:shadow-md hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
      disabled:opacity-60 disabled:cursor-not-allowed
    "
    :class="buttonClasses"
    @click="handleClick"
    :disabled="isDisabled"
    aria-pressed="isSelected"
  >
    <!-- Contenido izquierdo -->
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <!-- Burbuja letra -->
      <div
        class="
          flex items-center justify-center
          w-8 h-8 rounded-full text-sm font-bold
          shrink-0 transition-colors
        "
        :class="letterClasses"
      >
        {{ letter }}
      </div>

      <!-- Texto, con responsive truncation -->
      <span class="text-primary-dark font-medium text-left text-sm sm:text-base break-words">
        {{ text }}
      </span>
    </div>

    <!-- Icono de check alineado correctamente -->
    <IconComponent
      v-if="isSelected || isCorrect"
      icon="check"
      class="text-primary shrink-0 text-lg sm:text-xl"
    />
  </button>
</template>


<script setup>
import {computed} from 'vue'
import IconComponent from '@/components/IconComponent.vue'

const props = defineProps({ // Propiedades que recibe del padre
  text: {
    type: String,
    required: true, //Texto de la pregunta
  },
  letter: {
    type: String, //Letra a mostrar en la pregunta
    default: 'A',
  },
  isSelected: {
    type: Boolean, //Estado de selección
    default: false,
  },
  isDisabled: {
    type: Boolean, //Estado de interacción
    default: false,
  },
  isCorrect: {
    type: Boolean, //Definición de valor correcto
    default: false,
  },
  isWrong: {
    type: Boolean, //Definición de valor incorrecto
    default: false,
  },
})

const emit = defineEmits(['select']) //Definición de evento personalizado que emite al padre

function handleClick() { 
  if (props.isDisabled) return //Comprueba si el componente está deshabilitado (para evitar errores de lógica con un botón deshabilitado)
  emit('select', props.text) //Emite el evento 'select' al padre con el valor de texto del botón seleccionado
}

const buttonClasses = computed(() => { //Se define la propiedad computada del botón
  if (props.isCorrect) {
    return 'border-green-300 bg-green-50'
  }
  if (props.isWrong) {
    return 'border-red-300 bg-red-50'
  }
  if (props.isSelected) {
    return 'bg-primary-light/10 border-primary'
  }
  return 'border-gray-100' //Devuelve las clases dependiendo del estado del botón.
})

const letterClasses = computed(() => { //Se define la propiedad computada de las letras
  if (props.isCorrect) return 'bg-green-500 text-white'
  if (props.isWrong) return 'bg-red-400 text-white'
  if (props.isSelected) return 'bg-primary text-white'
  return 'bg-gray-200 text-gray-500 group-hover:bg-primary group-hover:text-white' //Devuelve las clases a las letras dependiendo del estado del botón.
})
</script>

