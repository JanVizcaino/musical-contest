<template>
  <div
    :class="[
      'rounded-2xl flex justify-between items-center p-4 mb-3 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl',
      borderColor,
      bgColor
    ]"
  >
    <div class="flex items-center gap-4">
      <!-- Icono según posición con tamaño variable -->
      <div :class="iconContainerClass">
        <IconComponent :icon="iconName" />
      </div>

      <div class="flex flex-col">
        <!-- Usuario y posición -->
        <div class="flex items-baseline gap-2">
          <p :class="userClass">{{ user }}</p>
          <p class="text-gray-700 font-medium">#{{ String(pos) }}</p>
        </div>

        <!-- Score y fecha -->
        <div class="flex items-center gap-4 mt-1 text-sm">
          <p class="text-gray-800">{{ score }}% de precisión</p><span class="text-gray-400">|</span> 
          <p class="text-gray-800">{{seconds}}s de tiempo total </p><span class="text-gray-400">|</span> 
          <p class="text-gray-800">{{avgSeconds}}s tiempo medio </p><span class="text-gray-400">|</span> 
          <p class="text-gray-400 text-sm">{{ formattedDate }}</p>
        </div>
      </div>
    </div>

    <!-- StatComponent para puntos -->
    <StatComponent :stat="String(score)" title="puntos" class="ml-4 text-secondary" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconComponent from '@/components/IconComponent.vue'
import StatComponent from '@/components/StatComponent.vue'

const { score, user, date, pos, seconds, avgSeconds } = defineProps({
  score: { type: [String, Number], default: '' },
  user: { type: String, default: '' },
  date: { type: String, default: '' },
  pos: { type: [String, Number], default: '' },
  seconds: {type: [String, Number], default: ''},
  avgSeconds: {type: [String, Number], default: ''}
})

const formattedDate = computed(() => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
})

const borderColor = computed(() => {
  switch (Number(pos)) {
    case 1: return 'border-yellow-400'
    case 2: return 'border-gray-400'
    case 3: return 'border-amber-700'
    default: return 'border-gray-300'
  }
})

const bgColor = computed(() => {
  switch (Number(pos)) {
    case 1: return 'bg-yellow-50'
    case 2: return 'bg-gray-100'
    case 3: return 'bg-amber-50'
    default: return 'bg-white'
  }
})

const iconContainerClass = computed(() => {
  switch (Number(pos)) {
    case 1: return 'text-yellow-400 text-4xl md:text-5xl font-bold'
    case 2: return 'text-gray-600 text-3xl md:text-4xl font-semibold'
    case 3: return 'text-amber-700 text-3xl md:text-4xl font-semibold'
    default: return 'text-gray-500 text-2xl md:text-3xl'
  }
})

const iconName = computed(()=>{
  switch (Number(pos)) {
    case 1: return 'trophy'
    case 2: return 'star'
    case 3: return 'medal'
    default: return String(pos);
  }
})

const userClass = computed(() => {
  switch (Number(pos)) {
    case 1: return 'font-bold text-lg md:text-xl text-yellow-700'
    case 2: return 'font-bold text-lg md:text-xl text-gray-800'
    case 3: return 'font-bold text-lg md:text-xl text-amber-800'
    default: return 'font-semibold text-lg md:text-xl text-gray-900'
  }
})

</script>
