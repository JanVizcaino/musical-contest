<template>
  <section
    v-if="gameState === 'start'"
    class="bg-gradient-primary h-screen flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full gap-y-8 p-8 bg-white rounded-2xl shadow-2xl flex flex-col justify-center"
    >
      <div class="flex flex-col justify-center gap-4 items-center">
        <div
          class="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg text-white"
        >
          <IconComponent icon="music" class="text-4xl" />
        </div>
        <div class="text-center">
          <h3 class="text-2xl font-bold text-primary mb-2">¡Adivina la canción!</h3>
          <p class="text-gray-500">Escucha fragmentos de 5 segundos y adivina el título correcto</p>
        </div>
      </div>

      <div class="flex flex-col items-start gap-y-4 justify-start bg-gray-50 p-6 rounded-xl">
        <IconListComponent icon="1" text="Escucha el fragmento de la canción" />
        <IconListComponent icon="2" text="Elige la respuesta correcta entre 4 opciones" />
        <IconListComponent icon="star" text="Gana 10 puntos por cada respuesta correcta" />
      </div>

      <div class="space-y-4">
        <InputComponent
          placeholder="Introduce tu nombre"
          icon="user"
          label="Tu nombre"
          v-model="playerName"
        />

        <ButtonComponent
          icon="play"
          label="Comenzar el juego"
          class="bg-gradient-primary w-full py-4 text-lg shadow-lg hover:shadow-xl transition-shadow"
          @click="startGame"
        />
      </div>
    </div>
  </section>

  <section
    v-else-if="gameState === 'playing'"
    class="bg-gradient-primary h-screen flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-auto"
    >
      <div class="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <IconComponent icon="user" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">JUGADOR</span>
            <span class="font-bold text-primary-dark">{{ playerName || 'Invitado' }}</span>
          </div>
        </div>

        <div
          class="bg-white border border-gray-200 py-2 px-4 flex items-center gap-2 rounded-md shadow-sm"
        >
          <IconComponent icon="star" class="text-gray-400" />
          <span class="font-bold text-xl text-primary">{{ playerPoints }}</span>
          <span class="text-xs text-gray-400 font-bold uppercase">PTS</span>
        </div>
      </div>

      <div class="p-6 flex flex-col gap-6 overflow-y-auto">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm font-medium text-gray-500">
            <span>Pregunta {{ songIndex }} de {{ totalSongs }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full transition-all duration-500"
              style="width: 20%"
            ></div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 border border-primary/10"
        >
          <div class="relative">
            <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <ButtonComponent
              icon="play"
              class="relative bg-gradient-primary w-20 h-20 rounded-full text-3xl text-white"
            />
          </div>

          <div
            class="flex items-center w-full gap-4 text-primary-dark bg-white/60 p-3 rounded-xl backdrop-blur-sm"
          >
            <IconComponent icon="volume-high" class="text-gray-400" />
            <input
              id="seek"
              type="range"
              min="0"
              max="100"
              v-model="songTimer"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="font-mono text-sm font-bold w-12 text-right">{{ songTimer }}s</div>
          </div>

          <div class="text-center">
            <p class="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">
              ¿Qué canción es?
            </p>
            <p class="text-xl font-bold text-primary-dark" v-if="songTitle">{{ songTitle }}</p>
            <p class="text-xl font-bold text-gray-300 italic" v-else>Escuchando...</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OptionComponent letter="A" text="Bohemian Rhapsody" />
          <OptionComponent letter="B" text="Stairway to Heaven" />
          <OptionComponent letter="C" text="Hotel California" />
          <OptionComponent letter="D" text="Imagine" />
        </div>

        <ButtonComponent
          v-if="playingState === 'answering'"
          icon="paper-plane"
          label="Enviar respuesta"
          class="bg-white text-secondary rounded-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import IconListComponent from '@/components/IconListComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import OptionComponent from '@/components/OptionComponent.vue' // Importamos el nuevo componente

import { ref } from 'vue'

const playerName = ref('')
const gameState = ref('start')
const playerPoints = ref(0)
const songTimer = ref(0)
const songTitle = ref('')
const songIndex = ref(0)
const totalSongs = ref(10)
const playingState = ref('')

function startGame() {
  gameState.value = 'playing'
  playingState.value = 'answering'
  playerPoints.value = 0
  songTimer.value = 0
}
</script>

<style scoped>
/* Utilidad para el input range para que se vea consistente en navegadores */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--color-primary, #4f46e5);
  margin-top: -4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
