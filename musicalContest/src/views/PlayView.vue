<template>
  <!-- START SCREEN -->
  <section
    v-if="gameStore.gameState === 'start'"
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
            Escucha fragmentos de {{ gameStore.snippetDuration }} segundos y adivina el título correcto
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
          v-model="gameStore.playerName"
        />
        <ButtonComponent
          icon="play"
          label="Comenzar el juego"
          class="bg-gradient-primary w-full py-4 text-lg shadow-lg hover:shadow-xl rounded-xl transition-shadow"
          :disabled="!gameStore.playerName"
          @click="handleStartGame"
        />
      </div>
    </div>
  </section>

  <section
    v-else-if="gameStore.gameState === 'playing'"
    class="bg-gradient-primary h-[130vh] flex justify-center items-center p-4"
  >
    <div
      class="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[120vh] md:h-auto"
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
            <span class="font-bold text-primary-dark">{{ gameStore.playerName || 'Invitado' }}</span>
          </div>
        </div>

        <div
          class="bg-white border border-gray-200 py-2 px-4 flex items-center gap-2 rounded-md shadow-sm"
        >
          <IconComponent icon="star" class="text-gray-400" />
          <span class="font-bold text-xl text-primary">{{ gameStore.playerPoints }}</span>
          <span class="text-xs text-gray-400 font-bold uppercase">PTS</span>
        </div>
      </div>

      <div class="p-6 flex flex-col gap-6 overflow-y-auto">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm font-medium text-gray-500">
            <span>Pregunta {{ gameStore.currentIndex + 1 }} de {{ gameStore.playableSongs }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full transition-all duration-500"
              :style="{ width: progressWidth }"
            ></div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-6 border border-primary/10"
        >
          <div class="relative" v-if="gameStore.playingState === 'answering'">
            <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <ButtonComponent
              icon="play"
              class="relative bg-gradient-primary w-20 h-20 rounded-full text-3xl text-white"
              @click="playSnippet"
            />
          </div>

          <div
            v-if="gameStore.playingState === 'answering'"
            class="flex items-center w-full gap-4 text-primary-dark bg-white/60 p-3 rounded-xl backdrop-blur-sm"
          >
            <IconComponent icon="volume-high" class="text-gray-400" />
            <input
              id="seek"
              type="range"
              :min="0"
              :max="gameStore.snippetDuration"
              step="0.01"
              :value="gameStore.songTimer"
              @input="onSeekChange($event.target.value)"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="font-mono text-sm font-bold w-12 text-right">
              {{ Math.round(gameStore.songTimer) }}s
            </div>
          </div>

          <div class="text-center">
            <p class="text-sm font-bold text-primary/60 uppercase tracking-widest mb-1">
              ¿Qué canción es?
            </p>
            <p class="text-xl font-bold text-primary-dark" v-if="gameStore.songTitle">
              {{ gameStore.songTitle }}
            </p>
            <p class="text-md text-primary-light" v-if="gameStore.songTitle">
              {{ gameStore.songSubtitle }}
            </p>
            <p class="text-xl font-bold text-gray-300 italic" v-else>Escuchando...</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OptionComponent
            v-for="(opcion, index) in currentQuestion?.opciones || []"
            :key="index"
            :letter="String.fromCharCode(65 + index)"
            :text="opcion"
            :is-selected="gameStore.selectedAnswer === opcion"
            :is-disabled="gameStore.playingState !== 'answering'"
            :is-correct="
              gameStore.playingState === 'reviewing' && opcion === currentQuestion?.respuesta
            "
            :is-wrong="
              gameStore.playingState === 'reviewing' &&
              gameStore.selectedAnswer === opcion &&
              opcion !== currentQuestion?.respuesta
            "
            @select="(val) => (gameStore.selectedAnswer = val)"
          />
        </div>

        <ButtonComponent
          v-if="gameStore.playingState === 'answering'"
          icon="paper-plane"
          label="Enviar respuesta"
          class="bg-white text-secondary rounded-2xl"
          :disabled="!gameStore.selectedAnswer"
          @click="handleSubmit"
        />
        <ButtonComponent
          v-else-if="gameStore.playingState === 'reviewing'"
          icon="arrow-right"
          label="Siguiente pregunta"
          class="bg-primary text-white rounded-2xl"
          @click="handleNext"
        />
      </div>
    </div>
  </section>

<section
  v-else-if="gameStore.gameState === 'finished'"
  class="bg-gradient-primary h-screen flex justify-center items-center p-6"
>
  <div
    class="max-w-5xl w-full bg-white backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-8"
  >
    <h1 class="text-4xl font-extrabold text-secondary animate-bounce text-center">¡Juego terminado!</h1>
    
    <StatComponent :stat="String(gameStore.playerPoints)" title="Puntuación" class="bg-gradient-primary p-4 rounded-xl"/>

    <p class="text-2xl text-primary w-1/2 text-center mt-2">{{ funnyPhrase }}</p>


    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white rounded-xl p-5 shadow-md hover:scale-105 transform transition">
        <p class="text-lg text-accent">Resultado:</p>
        <p class="text-2xl font-bold text-accent">{{ gameStore.score }} / {{ totalQuestions }}</p>
      </div>
      <div class="bg-secowhitedary rounded-xl p-5 shadow-md hover:scale-105 transform transition">
        <p class="text-lg f text-highlight">Precisión</p>
        <p class="text-2xl font-bold text-highlight">{{ accuracyPct }}%</p>
      </div>
      <div class="bg-white rounded-xl p-5 shadow-md hover:scale-105 transform transition col-span-1 sm">
        <p class="text-lg text-secondary">Tiempo medio por pregunta</p>
        <p class="text-2xl font-bold text-secondary">{{ avgResponseTime.toFixed(2) }} s</p>
      </div>
      <div class="bg-terciary rounded-xl p-5 shadow-md hover:scale-105 transform transition">
        <p class="text-lg text-primary">Tiempo total</p>
        <p class="text-2xl font-bold text-primary">{{ formatTime(totalResponseTime) }}</p>
      </div>
    </div>

    <div class="flex w-full gap-4 mt-4">
      <ButtonComponent
        label="Jugar de nuevo"
        icon="refresh"
        class="bg-white text-primary font-bold rounded-2xl flex-1 justify-center transition transform hover:scale-105"
        @click="handleReset"
      />
      <ButtonComponent
        label="Mira el ranking"
        icon="star"
        class="bg-gradient-primary text-white font-bold rounded-2xl flex-1 justify-center transition transform hover:scale-105"
        to="/ranking"
      />
    </div>
  </div>
</section>


</template>

<script setup>
/* Imports: cosas que uso desde Vue, howler y mis stores/componentes */
import { computed, ref, onUnmounted } from 'vue' // uso reactive/computed y un hook para limpiar al desmontar
import { Howl } from 'howler' // librería para reproducir audio
import { useGameStore } from '@/stores/game' // mi store del juego

/* Componentes reutilizables que uso en la vista */
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import IconListComponent from '@/components/IconListComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import OptionComponent from '@/components/OptionComponent.vue'
import StatComponent from '@/components/StatComponent.vue'

/* Store del ranking para guardar puntuaciones */
import { useRankingStore } from '@/stores/ranking'

/* Instancio los stores (los uso como singletons reactivamente) */
const rankingStore = useRankingStore()
const gameStore = useGameStore()

/* Variables para manejar la reproducción y temporizadores */
let howlerPlayer = null // instancia Howl activa
let playbackTimeout = null // timeout que para el snippet
let progressInterval = null // interval que actualiza progreso
let snippetStartAt = 0 // desde donde empiezo el snippet dentro de la canción
const songVolume = 0.8 // volumen por defecto

/* Guardamos tiempos de respuesta para estadísticas */
const responseTimes = ref([]) // array de segundos por cada respuesta
const questionStartAt = ref(null) // timestamp de inicio de la pregunta (ms)

/* computed: pregunta actual (la saco del store y barajo opciones) */
const currentQuestion = computed(() => {
  const question = gameStore.currentQuestion || gameStore.questions?.[gameStore.currentIndex] || null
  if (!question) return null

  return {
    ...question,
    opciones: gameStore.shuffle(question.opciones) // devuelvo opciones barajadas cada vez
  }
})

/* ancho del progreso (porcentaje) basado en índice / total */
const progressWidth = computed(() => {
  if (!gameStore.playableSongs) return '0%'
  const pct = (gameStore.currentIndex / gameStore.playableSongs) * 100
  return `${Math.max(0, Math.min(100, pct))}%` // lo aseguro entre 0 y 100
})

/* más helpers reactivos para stats */
const totalQuestions = computed(() => gameStore.playableSongs || (gameStore.questions?.length || 0))
const correctAnswers = computed(() => gameStore.score || 0)
const accuracyPct = computed(() => totalQuestions.value ? Math.round((correctAnswers.value / totalQuestions.value) * 100) : 0)
const totalResponseTime = computed(() => responseTimes.value.reduce((a, b) => a + b, 0))
const avgResponseTime = computed(() => responseTimes.value.length ? (totalResponseTime.value / responseTimes.value.length) : 0)

/* Frases graciosas según rendimiento (solo texto) */
const funnyPhrase = computed(() => {
  const c = correctAnswers.value
  const t = totalQuestions.value || 1
  const pct = (c / t) * 100
  if (pct === 100) return '¡Perfecto! Conoces más letras que posiciones del Kamasutra'
  if (pct >= 80) return 'Casi orgásmico — solo faltó el cigarrito después'
  if (pct >= 50) return 'Como un polvo mediocre: estuvo bien, pero esperabas más'
  if (pct >= 20) return 'Más perdid@ que un virgen en una despedida de solteros'
  return '¿Seguro que no te has distraido pensando en tu crush? '
})

/* formatea segundos a "Xm Ys" o "Ys" */
function formatTime(seconds) {
  if (!seconds) return '0s'
  const s = Math.round(seconds)
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return mm > 0 ? `${mm}m ${ss}s` : `${ss}s`
}

/* Limpia playback: para timeouts/intervals y libera Howler */
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
      howlerPlayer.stop() // paro reproducción
      howlerPlayer.unload && howlerPlayer.unload() // libero recursos si existe unload
      howlerPlayer = null
    }
  } catch (e) {
    console.warn('Error limpiando reproducción:', e) // no bloqueo la app si algo falla
  } finally {
    gameStore.songTimer = 0 // reseteo contador visible
    snippetStartAt = 0 // reseteo punto de inicio
  }
}

/* cuando el componente se desmonta, me aseguro de limpiar todo */
onUnmounted(() => clearPlayback())

/* función trivial para resolver path (por si en el futuro quiero prefix) */
function resolveSongPath(relPath) { return `${relPath}` }

/* Reproduce el snippet de la canción actual:
   - limpia estados previos
   - crea Howl y gestiona load/play/seek/timeout/progreso */
function playSnippet() {
  clearPlayback() // empiezo limpio
  const q = currentQuestion.value
  
  questionStartAt.value = Date.now() // marco inicio de la pregunta (para tiempo respuesta)
  
  if (!q || !q.rutaCancion) {
    console.warn('No hay canción para reproducir.')
    return
  }

  const srcPath = resolveSongPath(q.rutaCancion)
  howlerPlayer = new Howl({
    src: [srcPath],
    html5: true, // uso audio html5 para ficheros grandes/streaming
    volume: songVolume,
    onloaderror: (id, err) => console.error('Error cargando canción:', err),
    onplayerror: (id, err) => {
      console.error('Error reproduciendo canción:', err)
      howlerPlayer.once('unlock', () => howlerPlayer.play()) // intento reanudar si falla por bloqueo de autoplay
    },
  })

  /* Cuando Howler carga el audio, calculo desde dónde sacar el snippet */
  howlerPlayer.once('load', () => {
    const duration = howlerPlayer.duration() || 0
    if (duration > gameStore.snippetDuration) {
      // Si no tengo start guardado para esa ruta, lo genero aleatorio dentro del rango posible
      if (!(q.rutaCancion in gameStore.songSnippetStart)) {
        gameStore.songSnippetStart[q.rutaCancion] = Math.random() * (duration - gameStore.snippetDuration)
      }
      snippetStartAt = gameStore.songSnippetStart[q.rutaCancion]
    } else {
      snippetStartAt = 0 // canción corta -> empiezo desde 0
    }

    try {
      howlerPlayer.seek(snippetStartAt) // coloco puntero donde toca
    } catch (e) {
      console.error(e)
    }
    howlerPlayer.play() // reproduzco

    /* Timeout que para la reproducción cuando acaba el snippet */
    playbackTimeout = setTimeout(() => {
      if (howlerPlayer) howlerPlayer.stop()
      if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
      }
      playbackTimeout = null
      gameStore.songTimer = gameStore.snippetDuration // marco como completado
    }, gameStore.snippetDuration * 1000)

    /* Intervalo que actualiza el progreso visual del snippet */
    progressInterval = setInterval(() => {
      if (!howlerPlayer) return
      let currentSeek = 0
      try {
        currentSeek = howlerPlayer.seek() || 0
      } catch {
        currentSeek = 0
      }
      const played = Math.max(0, currentSeek - snippetStartAt)
      gameStore.songTimer = Math.min(Math.max(0, played), gameStore.snippetDuration)
    }, 150) // actualizo cada 150ms
  })

  /* si hay error al cargar, lo limpio todo */
  howlerPlayer.once('loaderror', (id, err) => {
    console.error('load error', err)
    clearPlayback()
  })
}

/* handler para cuando el usuario mueve el slider de seek:
   clampa el valor y busca dentro del snippet */
function onSeekChange(value) {
  const v = Number(value)
  const clamped = Math.max(0, Math.min(gameStore.snippetDuration, v))
  gameStore.songTimer = clamped
  if (howlerPlayer) {
    try {
      howlerPlayer.seek(snippetStartAt + clamped)
    } catch (e) {
      console.warn('seek falló:', e)
    }
  }
}

/* ----------------- Timeouts para submit automático ----------------- */
/* Variable para guardar id del timeout de submit */
let submitTimeoutId = null
const QUESTION_TIMEOUT_MS = 10_000 // 10 segundos por pregunta

/* borra el timeout de submit si existe */
function clearSubmitTimeout() {
  if (submitTimeoutId) {
    clearTimeout(submitTimeoutId)
    submitTimeoutId = null
  }
}

/* inicia el countdown que forzará handleSubmit con timeout=true */
function startQuestionCountdown(ms = QUESTION_TIMEOUT_MS) {
  // Reinicio cualquier timer anterior
  clearSubmitTimeout()

  // Marco inicio de la pregunta (para medir tiempo de respuesta)
  questionStartAt.value = Date.now()

  // Arranco timeout que llamará handleSubmit({ timeout: true }) pasado ms
  submitTimeoutId = setTimeout(() => {
    submitTimeoutId = null
    // Llamo a handleSubmit con try/catch por seguridad
    try {
      handleSubmit({ timeout: true })
    } catch (e) {
      console.error('Error al ejecutar submit por timeout:', e)
    }
  }, ms)
}
/* ------------------------------------------------------------------ */

/* handleStartGame: valida nombre, prepara el juego y arranca la 1ª pregunta */
function handleStartGame() {
  if (!gameStore.playerName) {
    alert('Introduce tu nombre para empezar') // feedback sencillo si falta nombre
    return
  }
  sessionStorage.setItem('username', gameStore.playerName) // guardo nombre en sesión
  
  responseTimes.value = [] // limpio tiempos previos
  questionStartAt.value = null

  if (typeof gameStore.startGame === 'function') {
    gameStore.startGame() // si el store tiene startGame, lo uso
  } else {
    // si no, inicializo manualmente las preguntas/estado
    gameStore.questions = Array.isArray(gameStore.questions) ? gameStore.questions : []
    if (Array.isArray(gameStore.questions) && gameStore.questions.length > 0) {
      gameStore.questions = gameStore.questions
        .sort(() => Math.random() - 0.5)
        .slice(0, gameStore.playableSongs)
    }
    gameStore.score = 0
    gameStore.playerPoints = 0
    gameStore.currentIndex = 0
    gameStore.playingState = 'answering'
    gameStore.songTimer = 0
    gameStore.songTitle = ''
    gameStore.songSubtitle = ''
    gameStore.gameState = 'playing'
  }

  // Empezar la primera pregunta: arranco countdown y reproduzco snippet
  startQuestionCountdown()
  playSnippet()
}

/* handleSubmit: gestiona envío/respuesta:
   - si timeout=true fuerza envío sin respuesta seleccionada
   - calcula tiempo de respuesta y actualiza puntuaciones */
function handleSubmit({ timeout = false } = {}) {
  // si no estamos en estado "answering" no hacemos nada
  if (gameStore.playingState !== 'answering') return

  // si NO es timeout y no hay respuesta seleccionada, salgo (usuario no ha elegido)
  if (!timeout && !gameStore.selectedAnswer) return

  try {
    // calculo tiempo de respuesta y lo guardo en responseTimes
    const now = Date.now()
    const respSec = questionStartAt.value ? ((now - questionStartAt.value) / 1000) : 0
    responseTimes.value.push(Number(respSec.toFixed(3)))
  } catch (e) {
    console.warn('Error calculando tiempo de respuesta:', e)
  } finally {
    // reseteo el timestamp de inicio de la pregunta
    questionStartAt.value = null
  }

  // limpio timeout de submit y cualquier reproducción activa
  clearSubmitTimeout()
  clearPlayback()

  // obtengo la respuesta correcta (si existe)
  const correctAnswer = currentQuestion.value?.respuesta

  if (timeout) {
    // si se acabó el tiempo: muestro mensaje y aplico penalización
    gameStore.songTitle = `Tiempo agotado — era: ${correctAnswer || '—'}`
    gameStore.songSubtitle = `${correctAnswer || ''} — ${currentQuestion.value?.artista || ''}`
    gameStore.playerPoints -= 5
  } else {
    // user respondió: compruebo si es correcta y actualizo score/points
    const correct = gameStore.selectedAnswer === correctAnswer
    if (correct) {
      gameStore.score += 1
      gameStore.playerPoints += 10
      gameStore.songTitle = `¡Correcto!`
    } else {
      gameStore.playerPoints -= 5
      gameStore.songTitle = `Incorrecto. Era: ${correctAnswer || '—'}`
    }
    gameStore.songSubtitle = `${correctAnswer || ''} — ${currentQuestion.value?.artista || ''}`
  }

  // pongo el juego en modo "reviewing" para que el usuario vea resultado antes de siguiente
  gameStore.playingState = 'reviewing'
}

/* handleNext: pasa a la siguiente pregunta:
   - limpia timeouts previos
   - si se acabo el juego guarda log y finaliza
   - arranca countdown + snippet para la siguiente */
function handleNext() {
  // limpio timeout de submit anterior si existe
  clearSubmitTimeout()

  if (gameStore.currentIndex + 1 >= gameStore.playableSongs) {
    saveLog()
    finishGame()
    return
  }

  gameStore.currentIndex++
  gameStore.selectedAnswer = null
  gameStore.songTitle = ''
  gameStore.playingState = 'answering'
  gameStore.songTimer = 0

  // reinicio el contador de la pregunta y arranco reproducción
  startQuestionCountdown()
  playSnippet()
}

/* finishGame: dejo flags en finished y limpio reproducción */
function finishGame() {
  gameStore.playingState = 'finished'
  gameStore.gameState = 'finished'
  clearPlayback()
}

/* handleReset: resetea todo el juego y la sesión (botón reiniciar) */
function handleReset() {
  clearPlayback()
  sessionStorage.removeItem('username')
  if (typeof gameStore.resetGame === 'function') {
    gameStore.resetGame()
  } else {
    // si no hay resetGame en el store, lo reseteo manualmente
    gameStore.playerName = ''
    gameStore.questions = []
    gameStore.currentIndex = 0
    gameStore.selectedAnswer = null
    gameStore.score = 0
    gameStore.playerPoints = 0
    gameStore.songTimer = 0
    gameStore.songTitle = ''
    gameStore.gameState = 'start'
    gameStore.playingState = 'answering'
  }
  
  responseTimes.value = []
  questionStartAt.value = null
}

/* saveLog: construye entrada con stats y la manda al rankingStore */
function saveLog() {
  try {
    const user = gameStore.playerName || sessionStorage.getItem('username') || 'Invitado'
    const totalTime = responseTimes.value.reduce((a,b) => a + b, 0)
    const avgTime = responseTimes.value.length ? (totalTime / responseTimes.value.length) : 0

    const entry = {
      user,
      score: gameStore.playerPoints || 0,
      timeSeconds: Number(totalTime.toFixed(3)),
      avgTimeSeconds: Number(avgTime.toFixed(3)),
      date: new Date().toISOString(),
    }
    console.log('[playview] Guardando -> Puntos:', entry.score, '| Tiempo total:', entry.timeSeconds.toFixed(2) + 's', '| Tiempo medio:', entry.avgTimeSeconds.toFixed(2) + 's')
    rankingStore.addEntry(entry) // llamo al store de ranking para persistir
  } catch (e) {
    console.warn('No se pudo guardar log:', e)
  }
}

</script>

<style scoped>
/* Utilidad para el input range */
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
