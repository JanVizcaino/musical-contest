<template>
  <div
    :class="[
      'rounded-2xl flex flex-col sm:flex-row justify-between items-center p-4 mb-3 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl gap-4 sm:gap-0',
      borderColor,
      bgColor
    ]"
  >
    <div class="flex items-center gap-4 w-full sm:w-auto">
      <!-- Icono según posición -->
      <div :class="`${iconContainerClass} flex-shrink-0`">
        <IconComponent :icon="iconName" />
      </div>

      <div class="flex flex-col w-full">
        <!-- Usuario + posición -->
        <div class="flex flex-wrap items-baseline gap-2">
          <p :class="userClass + ' break-all'">{{ user }}</p>
          <p class="text-gray-700 font-medium">#{{ String(pos) }}</p>
        </div>

        <!-- Score + fecha -->
        <div
          class="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm md:text-base"
        >
          <p class="text-gray-800">{{ score }}% de precisión</p>
          <span class="text-gray-400 hidden sm:inline">|</span>

          <p class="text-gray-800">{{ seconds }}s total</p>
          <span class="text-gray-400 hidden sm:inline">|</span>

          <p class="text-gray-800">{{ avgSeconds }}s medio</p>
          <span class="text-gray-400 hidden sm:inline">|</span>

          <p class="text-gray-400 text-xs">{{ formattedDate }}</p>
        </div>
      </div>
    </div>

    <!-- StatComponent -->
    <div class="w-full sm:w-auto flex justify-center sm:justify-end">
      <StatComponent
        :stat="String(score)"
        title="puntos"
        class="text-secondary w-full sm:w-auto"
      />
    </div>
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
