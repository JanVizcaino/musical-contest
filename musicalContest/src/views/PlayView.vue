<template>
  <!-- START SCREEN -->
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
          :disabled="!playerName"
          @click="startGame"
        />
      </div>
    </div>
  </section>

  <!-- GAME SCREEN -->
  <section
    v-else-if="gameState === 'playing'"
    class="bg-gradient-primary h-screen flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-auto"
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
        <!-- PROGRESO -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm font-medium text-gray-500">
            <span>Pregunta {{ currentIndex + 1 }} de {{ playableSongs }}</span>
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
          <div class="relative" v-if="playingState === 'answering'">
            <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <ButtonComponent
              icon="play"
              class="relative bg-gradient-primary w-20 h-20 rounded-full text-3xl text-white"
              @click="playSnippet"
            />
          </div>

          <div
            v-if="playingState === 'answering'"
            class="flex items-center w-full gap-4 text-primary-dark bg-white/60 p-3 rounded-xl backdrop-blur-sm"
          >
            <IconComponent icon="volume-high" class="text-gray-400" />
            <!-- range sincronizada y con seek manual -->
            <input
              id="seek"
              type="range"
              min="0"
              max="5"
              step="0.01"
              :value="songTimer"
              @input="onSeekChange($event.target.value)"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="font-mono text-sm font-bold w-12 text-right">
              {{ Math.round(songTimer) }}s
            </div>
          </div>

          <div class="text-center">
            <p class="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">
              ¿Qué canción es?
            </p>
            <p class="text-xl font-bold text-primary-dark" v-if="songTitle">{{ songTitle }}</p>
            <p class="text-md text-primary-light" v-if="songTitle">{{ songSubtitle }}</p>
            <p class="text-xl font-bold text-gray-300 italic" v-else>Escuchando...</p>
          </div>
        </div>

        <!-- OPCIONES -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OptionComponent
            v-for="(opcion, index) in currentQuestion?.opciones"
            :key="index"
            :letter="String.fromCharCode(65 + index)"
            :text="opcion"
            :is-selected="selectedAnswer === opcion"
            :is-disabled="playingState !== 'answering'"
            :data-option="opcion"
            @click="selectedAnswer = opcion"
          />
        </div>

        <!-- BOTONES -->
        <ButtonComponent
          v-if="playingState === 'answering'"
          icon="paper-plane"
          label="Enviar respuesta"
          class="bg-white text-secondary rounded-2xl"
          :disabled="!selectedAnswer"
          @click="submitAnswer"
        />
        <ButtonComponent
          v-else-if="playingState === 'reviewing'"
          icon="arrow-right"
          label="Siguiente pregunta"
          class="bg-primary text-white rounded-2xl"
          @click="nextQuestion"
        />
      </div>
    </div>
  </section>

  <!-- END SCREEN -->
  <section
    v-else-if="gameState === 'finished'"
    class="bg-gradient-primary h-screen flex justify-center items-center p-4"
  >
    <div
      class="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6"
    >
      <h1 class="text-3xl font-bold text-secondary text-center">¡Juego terminado!</h1>
      <p class="text-xl font-medium text-secondary">Puntuación final: {{ playerPoints }}</p>
      <ButtonComponent
        label="Jugar de nuevo"
        icon="refresh"
        class="bg-primary text-white rounded-2xl w-full"
        @click="resetGame"
      />
    </div>
  </section>
</template>

<script setup>
/*
  Versión actualizada:
  - Reproducción iniciada por el usuario (playSnippet)
  - Rutas relativas resueltas desde src/assets (Vite / import.meta.url)
  - Barra sincronizada con howler.seek() (songTimer va de 0 a 5)
  - No se incluye ni inicializa el ecualizador
*/

import { ref, computed, onUnmounted } from 'vue'
import { Howl } from 'howler'

import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import IconListComponent from '@/components/IconListComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import OptionComponent from '@/components/OptionComponent.vue'

import questions from '@/data/questions.json'

// --- Estados básicos
const playerName = ref('')
const gameState = ref('start') // start | playing | finished
const playingState = ref('answering') // answering | reviewing | finished (estado dentro de 'playing')

const currentIndex = ref(0)
const selectedAnswer = ref(null)
const score = ref(0)
const playerPoints = ref(0)
const playableSongs = ref(10)
const songTimer = ref(0) // segundos reproducidos del snippet (0..5)
const songTitle = ref('') // se muestra cuando estamos en reviewing
const songSubtitle = ref('') // se muestra cuando estamos en reviewing

// --- Reproducción / sync
let howlerPlayer = null // instancia Howl actual
let playbackTimeout = null // timeout para parar los 5s
let progressInterval = null // interval que actualiza songTimer desde howler.seek()
let snippetStartAt = 0 // posición de inicio en la canción (segundos)
const snippetDuration = 5 // duracion fija del snippet (segundos)
const songVolume = 0.8 // volumen por defecto

// --- Computed helpers
const currentQuestion = computed(() => questions.value?.[currentIndex.value] || null)
const progressWidth = computed(() => {
  if (playableSongs.value === 0) return '0%'
  return `${(currentIndex.value / playableSongs.value) * 100}%`
})

// --- Utilidades sencillas
function setRandomOrder(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function onSeekChange(value) {
  const v = Number(value)
  // clamp 0..snippetDuration
  const clamped = Math.max(0, Math.min(snippetDuration, v))
  songTimer.value = clamped
  if (howlerPlayer) {
    try {
      howlerPlayer.seek(snippetStartAt + clamped)
    } catch (e) {
      console.warn('seek falló:', e)
    }
  }
}

function saveLog(finalScore) {
  try {
    const logs = JSON.parse(localStorage.getItem('quizLogs') || '[]')
    logs.push({
      user: playerName.value || 'Invitado',
      date: new Date().toISOString(),
      score: finalScore,
    })
    localStorage.setItem('quizLogs', JSON.stringify(logs))
  } catch (e) {
    console.warn('No se pudo guardar log:', e)
  }
}

// --- Limpieza reprodución
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
    songTimer.value = 0
    snippetStartAt = 0
  }
}

onUnmounted(() => {
  clearPlayback()
})

// --- Resolución de rutas relativas (src/assets/songs/...)
function resolveSongPath(relPath) {
  return `/${relPath}`
}

// --- Reproducción iniciada por el usuario
/**
 * playSnippet() debe ser llamado desde un botón por el usuario.
 * Reproduce 5s desde una posición aleatoria (si la duración lo permite).
 * No cambia el playingState automáticamente a reviewing; el usuario debe
 * pulsar enviar (submitAnswer) para evaluar.
 */
function playSnippet() {
  // Si ya hay reproducción activa, reiniciamos
  clearPlayback()

  const q = currentQuestion.value
  if (!q || !q.rutaCancion) {
    console.warn('No hay canción para reproducir.')
    return
  }

  // Resolvemos la ruta para Vite (src/assets)
  const srcPath = resolveSongPath(q.rutaCancion)

  console.log(srcPath)

  howlerPlayer = new Howl({
    src: [srcPath],
    html5: true,
    volume: songVolume,
    onloaderror: (id, err) => {
      console.error('Error cargando canción:', err)
    },
    onplayerror: (id, err) => {
      console.error('Error reproduciendo canción:', err)
      // Intentamos recuperar reproduciendo de nuevo
      howlerPlayer.once('unlock', () => howlerPlayer.play())
    },
  })
  // Cuando cargue, calculamos posición aleatoria y reproducimos
  howlerPlayer.once('load', () => {
    const duration = howlerPlayer.duration() || 0
    let startAt = 0
    if (duration > snippetDuration) {
      startAt = Math.random() * (duration - snippetDuration)
    } else {
      startAt = 0
    }
    snippetStartAt = startAt

    // Intentamos seek antes de play (si falla, Howler puede ajustar)
    howlerPlayer.seek(startAt)

    // Reproducir
    howlerPlayer.play()

    // Configuramos un timeout que pare exactamente tras snippetDuration desde el inicio
    playbackTimeout = setTimeout(() => {
      // Paramos la reproducción al llegar a 5s
      if (howlerPlayer) {
        howlerPlayer.stop()
      }
      // limpieza pero NO forzamos reviewing; el usuario debe pulsar submitAnswer()
      if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
      }
      playbackTimeout = null
      // Aseguramos songTimer en 5
      songTimer.value = snippetDuration
    }, snippetDuration * 1000)

    // Interval que sincroniza songTimer leyendo howler.seek()
    progressInterval = setInterval(() => {
      if (!howlerPlayer) return
      let currentSeek = 0
      try {
        currentSeek = howlerPlayer.seek() || 0
      } catch {
        currentSeek = 0
      }
      const played = Math.max(0, currentSeek - snippetStartAt)
      // clamp 0..snippetDuration
      songTimer.value = Math.min(Math.max(0, played), snippetDuration)
    }, 150) // 150ms para una barra fluida
  })

  // Si la carga falla, informamos y limpiamos
  howlerPlayer.once('loaderror', (id, err) => {
    console.error('load error', err)
    clearPlayback()
  })
}

// --- Lógica principal del juego (sin autoplay)
async function startGame() {
  if (!playerName.value) {
    alert('Introduce tu nombre para empezar')
    return
  }

  sessionStorage.setItem('username', playerName.value)
  const loaded = questions
  const shuffled = setRandomOrder(loaded)

  shuffled.slice(0, 10)

  // Nos aseguramos de que cada pregunta tenga lo que esperamos
  questions.value = shuffled.map((q) => ({
    titulo: q.titulo || q.songTitle || q.pregunta || '',
    rutaCancion: q.rutaCancion || q.songPath || '',
    opciones: q.opciones || q.options || [],
    respuesta: q.respuesta || q.answer || '',
    artista: q.artista || q.artist || '',
  }))

  score.value = 0
  playerPoints.value = 0
  currentIndex.value = 0
  playingState.value = 'answering'
  songTitle.value = ''
  songSubtitle.value = ''
  gameState.value = 'playing'

  // NO reproducimos automáticamente: el usuario debe pulsar playSnippet()
  songTimer.value = 0
}

function submitAnswer() {
  if (playingState.value !== 'answering') return
  if (!selectedAnswer.value) return

  // Paramos cualquier reproducción activa
  clearPlayback()

  // limpiamos clases previas (si las hubiera)
  const allEls = document.querySelectorAll('[data-option]')
  allEls.forEach((el) => {
    el.classList.remove('bg-red-400', 'bg-green-400', 'bg-primary-light/10')
  })

  // DOM elements
  const selectedSelector = `[data-option="${selectedAnswer.value}"]`
  const selectedEl = document.querySelector(selectedSelector)

  // elemento correcto (según la respuesta esperada)
  const correctAnswer = currentQuestion.value?.respuesta
  const correctAnswerArtist = currentQuestion.value?.artista
  const correctSelector = `[data-option="${correctAnswer}"]`
  const correctEl = document.querySelector(correctSelector)

  console.log(currentQuestion)

  // Comprobar respuesta y aplicar clases
  const correct = selectedAnswer.value === correctAnswer
  if (correct) {
    score.value += 1
    playerPoints.value += 10
    if (selectedEl) selectedEl.classList.add('bg-green-400')
  } else {
    if (selectedEl) selectedEl.classList.add('bg-red-400')
    if (correctEl) correctEl.classList.add('bg-green-400')
  }

  songTitle.value = correct ? `¡Correcto!` : `Incorrecto. Era: ${correctAnswer || '—'}`
  songSubtitle.value = `"${correctAnswer}" - ${correctAnswerArtist}`
  playingState.value = 'reviewing'
}

function nextQuestion() {
  if (playingState.value !== 'reviewing') return

  if (currentIndex.value + 1 >= playableSongs.value) {
    playingState.value = 'finished'
    gameState.value = 'finished'
    saveLog(score.value)
    finishGame()
    return
  }

  // Avanzamos
  currentIndex.value++
  selectedAnswer.value = null
  songTitle.value = ''
  playingState.value = 'answering'
  songTimer.value = 0

  // No reproducimos automáticamente; el usuario debe pulsar playSnippet()
}

function finishGame() {
  playingState.value = 'finished'
  gameState.value = 'finished'
  saveLog(score.value)
  clearPlayback()
}

function resetGame() {
  clearPlayback()
  sessionStorage.removeItem('username')
  playerName.value = ''
  questions.value = []
  currentIndex.value = 0
  selectedAnswer.value = null
  score.value = 0
  playerPoints.value = 0
  songTimer.value = 0
  songTitle.value = ''
  gameState.value = 'start'
  playingState.value = 'answering'
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
