<template>
  <!-- START SCREEN -->
  <section
    v-if="store.gameState === 'start'"
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
          <p class="text-gray-500">
            Escucha fragmentos de {{ store.snippetDuration }} segundos y adivina el título correcto
          </p>
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
          v-model="store.playerName"
        />
        <ButtonComponent
          icon="play"
          label="Comenzar el juego"
          class="bg-gradient-primary w-full py-4 text-lg shadow-lg hover:shadow-xl transition-shadow"
          :disabled="!store.playerName"
          @click="handleStartGame"
        />
      </div>
    </div>
  </section>

  <!-- GAME SCREEN -->
  <section
    v-else-if="store.gameState === 'playing'"
    class="bg-gradient-primary h-[130vh] flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[120vh] md:h-auto"
    >
      <!-- HEADER -->
      <div class="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <IconComponent icon="user" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">JUGADOR</span>
            <span class="font-bold text-primary-dark">{{ store.playerName || 'Invitado' }}</span>
          </div>
        </div>

        <div
          class="bg-white border border-gray-200 py-2 px-4 flex items-center gap-2 rounded-md shadow-sm"
        >
          <IconComponent icon="star" class="text-gray-400" />
          <span class="font-bold text-xl text-primary">{{ store.playerPoints }}</span>
          <span class="text-xs text-gray-400 font-bold uppercase">PTS</span>
        </div>
      </div>

      <div class="p-6 flex flex-col gap-6 overflow-y-auto">
        <!-- PROGRESO -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm font-medium text-gray-500">
            <span>Pregunta {{ store.currentIndex + 1 }} de {{ store.playableSongs }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full transition-all duration-500"
              :style="{ width: progressWidth }"
            ></div>
          </div>
        </div>

        <!-- REPRODUCTOR / INFO -->
        <div
          class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 border border-primary/10"
        >
          <div class="relative" v-if="store.playingState === 'answering'">
            <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <ButtonComponent
              icon="play"
              class="relative bg-gradient-primary w-20 h-20 rounded-full text-3xl text-white"
              @click="playSnippet"
            />
          </div>

          <div
            v-if="store.playingState === 'answering'"
            class="flex items-center w-full gap-4 text-primary-dark bg-white/60 p-3 rounded-xl backdrop-blur-sm"
          >
            <IconComponent icon="volume-high" class="text-gray-400" />
            <!-- range sincronizada y con seek manual -->
            <input
              id="seek"
              type="range"
              :min="0"
              :max="store.snippetDuration"
              step="0.01"
              :value="store.songTimer"
              @input="onSeekChange($event.target.value)"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="font-mono text-sm font-bold w-12 text-right">
              {{ Math.round(store.songTimer) }}s
            </div>
          </div>

          <div class="text-center">
            <p class="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">
              ¿Qué canción es?
            </p>
            <p class="text-xl font-bold text-primary-dark" v-if="store.songTitle">
              {{ store.songTitle }}
            </p>
            <p class="text-md text-primary-light" v-if="store.songTitle">
              {{ store.songSubtitle }}
            </p>
            <p class="text-xl font-bold text-gray-300 italic" v-else>Escuchando...</p>
          </div>
        </div>

        <!-- OPCIONES -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OptionComponent
            v-for="(opcion, index) in currentQuestion?.opciones || []"
            :key="index"
            :letter="String.fromCharCode(65 + index)"
            :text="opcion"
            :is-selected="store.selectedAnswer === opcion"
            :is-disabled="store.playingState !== 'answering'"
            :is-correct="
              store.playingState === 'reviewing' && opcion === currentQuestion?.respuesta
            "
            :is-wrong="
              store.playingState === 'reviewing' &&
              store.selectedAnswer === opcion &&
              opcion !== currentQuestion?.respuesta
            "
            @select="(val) => (store.selectedAnswer = val)"
          />
        </div>

        <!-- BOTONES -->
        <ButtonComponent
          v-if="store.playingState === 'answering'"
          icon="paper-plane"
          label="Enviar respuesta"
          class="bg-white text-secondary rounded-2xl"
          :disabled="!store.selectedAnswer"
          @click="handleSubmit"
        />
        <ButtonComponent
          v-else-if="store.playingState === 'reviewing'"
          icon="arrow-right"
          label="Siguiente pregunta"
          class="bg-primary text-white rounded-2xl"
          @click="handleNext"
        />
      </div>
    </div>
  </section>

  <!-- END SCREEN -->
  <section
    v-else-if="store.gameState === 'finished'"
    class="bg-gradient-primary h-screen flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6"
    >
      <h1 class="text-3xl font-bold text-secondary text-center">¡Juego terminado!</h1>
      <p class="text-xl font-medium text-secondary">Puntuación final: {{ store.playerPoints }}</p>
      <ButtonComponent
        label="Jugar de nuevo"
        icon="refresh"
        class="bg-primary text-white rounded-2xl w-full"
        @click="handleReset"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onUnmounted } from 'vue'
import { Howl } from 'howler'
import { useGameStore } from '@/stores/game'

import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import IconListComponent from '@/components/IconListComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import OptionComponent from '@/components/OptionComponent.vue'

const store = useGameStore()

let howlerPlayer = null
let playbackTimeout = null
let progressInterval = null
let snippetStartAt = 0
const songVolume = 0.8

// computed helpers
const currentQuestion = computed(() => {
  if (store.currentQuestion) return store.currentQuestion
  return store.questions?.[store.currentIndex] || null
})

const progressWidth = computed(() => {
  if (!store.playableSongs) return '0%'
  const pct = (store.currentIndex / store.playableSongs) * 100
  return `${Math.max(0, Math.min(100, pct))}%`
})

// cleanup
function clearPlayback() {
  try {
    if (playbackTimeout) {
      clearTimeout(playbackTimeout)
      playbackTimeout = null
    }
    if (progressInterval) {
      clearInterval(progressInterval)
      progressInterval = null
    }
    if (howlerPlayer) {
      howlerPlayer.stop()
      howlerPlayer.unload && howlerPlayer.unload()
      howlerPlayer = null
    }
  } catch (e) {
    console.warn('Error limpiando reproducción:', e)
  } finally {
    store.songTimer = 0
    snippetStartAt = 0
  }
}

onUnmounted(() => clearPlayback())

function resolveSongPath(relPath) { return `${relPath}` }

// playback logic
function playSnippet() {
  clearPlayback()
  const q = currentQuestion.value
  if (!q || !q.rutaCancion) {
    console.warn('No hay canción para reproducir.')
    return
  }

  const srcPath = resolveSongPath(q.rutaCancion)
  howlerPlayer = new Howl({
    src: [srcPath],
    html5: true,
    volume: songVolume,
    onloaderror: (id, err) => console.error('Error cargando canción:', err),
    onplayerror: (id, err) => {
      console.error('Error reproduciendo canción:', err)
      howlerPlayer.once('unlock', () => howlerPlayer.play())
    },
  })

  howlerPlayer.once('load', () => {
    const duration = howlerPlayer.duration() || 0
    // Usar fragmento guardado o generar uno nuevo
    if (duration > store.snippetDuration) {
      if (!(q.rutaCancion in store.songSnippetStart)) {
        store.songSnippetStart[q.rutaCancion] = Math.random() * (duration - store.snippetDuration)
      }
      snippetStartAt = store.songSnippetStart[q.rutaCancion]
    } else {
      snippetStartAt = 0
    }

    try {
      howlerPlayer.seek(snippetStartAt)
    } catch (e) {
      console.error(e)
    }
    howlerPlayer.play()

    playbackTimeout = setTimeout(() => {
      if (howlerPlayer) howlerPlayer.stop()
      if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
      }
      playbackTimeout = null
      store.songTimer = store.snippetDuration
    }, store.snippetDuration * 1000)

    progressInterval = setInterval(() => {
      if (!howlerPlayer) return
      let currentSeek = 0
      try {
        currentSeek = howlerPlayer.seek() || 0
      } catch {
        currentSeek = 0
      }
      const played = Math.max(0, currentSeek - snippetStartAt)
      store.songTimer = Math.min(Math.max(0, played), store.snippetDuration)
    }, 150)
  })

  howlerPlayer.once('loaderror', (id, err) => {
    console.error('load error', err)
    clearPlayback()
  })
}


function onSeekChange(value) {
  const v = Number(value)
  const clamped = Math.max(0, Math.min(store.snippetDuration, v))
  store.songTimer = clamped
  if (howlerPlayer) {
    try {
      howlerPlayer.seek(snippetStartAt + clamped)
    } catch (e) {
      console.warn('seek falló:', e)
    }
  }
}

// Handlers que llaman a acciones del store (si las tienes) o usan la lógica del store
function handleStartGame() {
  // session storage con username
  if (!store.playerName) {
    alert('Introduce tu nombre para empezar')
    return
  }
  sessionStorage.setItem('username', store.playerName)
  // si el store tiene startGame como acción -> usa la acción
  if (typeof store.startGame === 'function') {
    store.startGame()
  } else {
    // fallback: inicializar preguntas localmente si store no tiene acción
    store.questions = Array.isArray(store.questions) ? store.questions : [] // no tocar si no existe
    // intenta barajar y tomar primeras n
    if (Array.isArray(store.questions) && store.questions.length > 0) {
      store.questions = store.questions
        .sort(() => Math.random() - 0.5)
        .slice(0, store.playableSongs)
    }
    store.score = 0
    store.playerPoints = 0
    store.currentIndex = 0
    store.playingState = 'answering'
    store.songTimer = 0
    store.songTitle = ''
    store.songSubtitle = ''
    store.gameState = 'playing'
  }
  // opcional: navegar a ruta /play si hace falta
  // router.push({ name: 'game' })
}

function handleSubmit() {
  if (store.playingState !== 'answering') return
  if (!store.selectedAnswer) return

  // stop audio
  clearPlayback()

  // si existe submitAnswer en store, úsalo (centraliza la lógica)
  if (typeof store.submitAnswer === 'function') {
    store.submitAnswer()
  } else {
    // fallback local
    const correctAnswer = currentQuestion.value?.respuesta
    const correct = store.selectedAnswer === correctAnswer
    if (correct) {
      store.score += 1
      store.playerPoints += 10
    }
    store.songTitle = correct ? `¡Correcto!` : `Incorrecto. Era: ${correctAnswer || '—'}`
    store.songSubtitle = `${correctAnswer || ''} — ${currentQuestion.value?.artista || ''}`
    store.playingState = 'reviewing'
  }
}

function handleNext() {
  if (typeof store.nextQuestion === 'function') {
    store.nextQuestion()
  } else {
    // fallback local next
    if (store.currentIndex + 1 >= store.playableSongs) {
      store.playingState = 'finished'
      store.gameState = 'finished'
      saveLog(store.score)
      finishGame()
      return
    }
    store.currentIndex++
    store.selectedAnswer = null
    store.songTitle = ''
    store.playingState = 'answering'
    store.songTimer = 0
  }
}

function finishGame() {
  store.playingState = 'finished'
  store.gameState = 'finished'
  saveLog(store.score)
  clearPlayback()
  // router.push({ name: 'results' }) // opcional
}

function handleReset() {
  clearPlayback()
  sessionStorage.removeItem('username')
  if (typeof store.resetGame === 'function') {
    store.resetGame()
  } else {
    store.playerName = ''
    store.questions = []
    store.currentIndex = 0
    store.selectedAnswer = null
    store.score = 0
    store.playerPoints = 0
    store.songTimer = 0
    store.songTitle = ''
    store.gameState = 'start'
    store.playingState = 'answering'
  }
  // router.push({ name: 'start' })
}

function saveLog(finalScore) {
  try {
    const logs = JSON.parse(localStorage.getItem('quizLogs') || '[]')
    logs.push({
      user: store.playerName || 'Invitado',
      date: new Date().toISOString(),
      score: finalScore,
    })
    localStorage.setItem('quizLogs', JSON.stringify(logs))
  } catch (e) {
    console.warn('No se pudo guardar log:', e)
  }
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
