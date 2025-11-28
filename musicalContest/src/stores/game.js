import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import rawQuestions from '@/data/questions.json'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export const useGameStore = defineStore('game', () => { //Este store gestiona el estado del juego... Preguntas, puntuación, estado de reproducción...
  // Datos de estado
  const playerName = ref('')
  const playerPoints = ref(0)
  const score = ref(0)
  const gameState = ref('start')
  const playingState = ref('answering')
  const currentIndex = ref(0)
  const selectedAnswer = ref(null)
  const songSnippetStart = {}

  const snippetDuration = ref(5)
  const songTimer = ref(0)

  const songTitle = ref('')
  const songSubtitle = ref('')

  const playableSongs = ref(10)
  const questions = ref([...rawQuestions])

  // Getters
  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const progressPercent = computed(() =>
    ((currentIndex.value) / playableSongs.value) * 100 + '%'
  )

  // Acciones
  function startGame() {
    questions.value = shuffle(rawQuestions).slice(0, playableSongs.value)
    playerPoints.value = 0
    score.value = 0
    currentIndex.value = 0
    selectedAnswer.value = null
    songTimer.value = 0
    songTitle.value = ''
    songSubtitle.value = ''
    playingState.value = 'answering'
    gameState.value = 'playing'
  }

 

  function submitAnswer() {
    if (!currentQuestion.value || !selectedAnswer.value) return

    const correct = selectedAnswer.value === currentQuestion.value.respuesta
    if (correct) {
      score.value++
      playerPoints.value += 10
    }

    songTitle.value = correct
      ? '¡Correcto!'
      : `Incorrecto. Era: ${currentQuestion.value.respuesta}`

    songSubtitle.value = `"${currentQuestion.value.respuesta}" - ${currentQuestion.value.artista}`
    playingState.value = 'reviewing'
  }

  function nextQuestion() {
    if (currentIndex.value + 1 >= playableSongs.value) {
      endGame()
      return
    }
    currentIndex.value++
    selectedAnswer.value = null
    songTimer.value = 0
    songTitle.value = ''
    playingState.value = 'answering'
  }

  function endGame() {
    gameState.value = 'finished'
    playingState.value = 'finished'
  }

  function resetGame() {
    playerName.value = ''
    currentIndex.value = 0
    selectedAnswer.value = null
    score.value = 0
    playerPoints.value = 0
    songTimer.value = 0
    songTitle.value = ''
    songSubtitle.value = ''
    gameState.value = 'start'
    playingState.value = 'answering'
    questions.value = [...rawQuestions]
  }

  return {
    // state
    playerName,
    playerPoints,
    score,
    gameState,
    playingState,
    currentIndex,
    selectedAnswer,
    snippetDuration, 
    songTimer,
    songTitle,
    songSubtitle,
    questions,
    playableSongs,
    songSnippetStart,

    // getters
    currentQuestion,
    progressPercent,

    // actions
    startGame,
    submitAnswer,
    nextQuestion,
    endGame,
    resetGame
  }
})
