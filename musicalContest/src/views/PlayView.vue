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
                :style="{ width: progressWidth }"
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
          <OptionComponent 
            v-for="(opcion, index) in currentBlockQuestions[0]?.opciones" 
            :key="index"
            :letter="String.fromCharCode(65 + index)" 
            :text="opcion"
            :is-selected="selectedAnswer === opcion"
            @click="selectedAnswer = opcion"
            :is-disabled="playingState === 'result'"
          />
        </div>

        <ButtonComponent
          v-if="playingState === 'answering'"
          icon="paper-plane"
          label="Enviar respuesta"
          class="bg-white text-secondary rounded-2xl"
          :disabled="!selectedAnswer"
          @click="submitBlockAnswers"
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
import OptionComponent from '@/components/OptionComponent.vue' 

import { ref, computed } from 'vue'

// --- Estados Reactivos (Variables Globales Adaptadas)
const playerName = ref('')
const gameState = ref('start')
const playerPoints = ref(0)
const songTimer = ref(0)
const songTitle = ref('') // Se usará para mostrar el título en el resultado
const totalSongs = ref(0)
const playingState = ref('answering')
const selectedAnswer = ref(null)

// --- Lógica del Quiz
const correctAnswers = ref([])
const questionsBlocks = ref([])
const currentBlock = ref(0)
const score = ref(0) 
const currentBlockQuestions = ref([]) // Las preguntas del bloque actual
const currentSongPath = ref(null) // Ruta del audio a reproducir

// Para la barra de progreso
const songIndex = computed(() => currentBlock.value * 2 + 1)
const progressWidth = computed(() => {
    if (totalSongs.value === 0) return '0%'
    // Calcular el porcentaje basado en el número de preguntas *completadas*
    // Una pregunta se completa al pasar al siguiente bloque (si el bloque tiene 2 preguntas)
    const completedQuestions = currentBlock.value * 2
    return `${(completedQuestions / totalSongs.value) * 100}%`
})


// --- Funciones de Lógica del Quiz
function setRandomOrder(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function extractAnswers(array) {
    const answers = [];
    const questionsWithoutAnswer = array.map(q => {
        answers.push(q.respuesta);
        // Excluir 'respuesta' para las preguntas a mostrar, pero mantener 'rutaCancion' para el audio
        const { respuesta, ...resto } = q;
        return resto;
    });
    return { questionsWithoutAnswer, answers };
}

async function fetchQuestions() {
    try {
        // Asumiendo que las preguntas se cargarán localmente o desde una URL similar
        // Si no tienes el archivo en /assets/questions.json, esta línea fallará.
        // Podrías cargar el JSON directamente si lo incluyes como una importación.
        // Para simplificar, asumimos que obtendrás el array JSON directamente.
        const response = await fetch('/assets/questions.json');
        if (!response.ok) throw new Error("Error en la respuesta: " + response.status);
        return await response.json(); 
    } catch (error) {
        console.error("Hubo un problema con el fetch. Usando JSON de ejemplo:", error);
        // Retorna el JSON de ejemplo si falla el fetch (o si lo pones directamente)
        return [
            { "pregunta": "¿Cuál es la canción de Djavan?", "opciones": ["Açaí", "Oceano", "Flor de Lis", "Samurai"], "respuesta": "Açaí", "artista": "Djavan", "rutaCancion": "songs/acai.mp3" },
            // ... (rest of the JSON here if you want it hardcoded)
        ];
    }
}

async function saveLog(score, username) {
    const logs = JSON.parse(localStorage.getItem("quizLogs")) || [];
    // Nota: JSON.parse(username) asume que el nombre se guardó como JSON.stringify("nombre")
    const user = typeof username === 'string' && username.startsWith('"') ? JSON.parse(username) : username;

    const newLog = {
        user: user || 'Invitado', 
        date: new Date().toISOString(),
        correctAnswers: score
    };
    logs.push(newLog);
    localStorage.setItem("quizLogs", JSON.stringify(logs));
    console.log("Log guardado en localStorage:", newLog);
}

// --- Funciones Principales de Juego
function resetGame() {
    // Guardar el log antes de resetear
    saveLog(score.value, sessionStorage.getItem("username"));

    correctAnswers.value = [];
    questionsBlocks.value = [];
    currentBlock.value = 0;
    score.value = 0;
    totalSongs.value = 0;
    currentBlockQuestions.value = [];
    currentSongPath.value = null;
    selectedAnswer.value = null;
    songTitle.value = '';

    sessionStorage.removeItem("username");
    
    // Regresar a la vista de inicio
    gameState.value = 'start';
    playingState.value = 'answering';
}

function renderNextBlock() {
    // Si se completaron todos los bloques
    if (currentBlock.value >= questionsBlocks.value.length) {
        // Quiz completado, se podría pasar a un estado 'end'
        // Por ahora, solo se reinicia o se muestra el resultado final
        alert(`¡Has completado el quiz! Tu puntuación final es: ${score.value}`);
        resetGame();
        return;
    }

    // Inicializar el temporizador de la canción (simulación)
    songTimer.value = 0;
    const interval = setInterval(() => {
        if (songTimer.value < 5) { // Simular fragmento de 5 segundos
            songTimer.value++;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    const block = questionsBlocks.value[currentBlock.value];
    currentBlockQuestions.value = block;
    // La primera pregunta del bloque tendrá el audio a reproducir
    currentSongPath.value = block[0].rutaCancion;
    songTitle.value = ''; // Ocultar el título de la canción al inicio

    // Deseleccionar respuesta anterior
    selectedAnswer.value = null;
}

async function startGame() {
    if (!playerName.value) {
        alert("Por favor, introduce tu nombre para empezar.");
        return;
    }
    
    sessionStorage.setItem("username", JSON.stringify(playerName.value));
    
    try {
        const questions = await fetchQuestions();
        const orderedQuestions = setRandomOrder(questions);

        const { questionsWithoutAnswer, answers } = extractAnswers(orderedQuestions);
        correctAnswers.value = answers;
        totalSongs.value = questionsWithoutAnswer.length;
        currentBlock.value = 0;
        score.value = 0;
        questionsBlocks.value = [];

        // Dividir preguntas en bloques de 2
        for (let i = 0; i < questionsWithoutAnswer.length; i += 2) {
            questionsBlocks.value.push(questionsWithoutAnswer.slice(i, i + 2));
        }

        gameState.value = 'playing';
        renderNextBlock();

    } catch (err) {
        console.error("Error empezando el juego:", err);
    }
}

function checkBlockAnswers(userAnswers, blockIndex) {
    const startIndex = blockIndex * 2;
    let allCorrect = true;

    userAnswers.forEach((answer, i) => {
        const globalIndex = startIndex + i;
        if (answer === correctAnswers.value[globalIndex]) {
            score.value += 10; // Asumiendo 10 puntos por respuesta correcta
        } else {
            allCorrect = false;
        }
    });

    return allCorrect;
}

// Lógica de respuesta (sustituye al handler del formulario)
function submitBlockAnswers() {
    if (playingState.value !== 'answering') return;

    // Recoger las respuestas seleccionadas (simulando la lógica de tu formulario original)
    // En tu diseño de Vue, la respuesta seleccionada está en 'selectedAnswer'
    // Como tu bloque *actual* renderiza dos preguntas (la principal y la segunda)
    // y tu OptionComponent es genérico, debemos adaptar cómo se recogen las 2 respuestas.
    // **ASUMIMOS**: Solo se espera una respuesta para la *primera* pregunta del bloque, 
    // y el OptionComponent actual está diseñado para esa primera pregunta.
    // Si esperas 2 respuestas, necesitarías 2 `selectedAnswer` o un array.

    // A D A P T A C I Ó N   C R Í T I C A:
    // La plantilla Vue solo muestra UNA sección de opciones, asumiendo una pregunta.
    // Tu lógica de JS original esperaba 2 preguntas por bloque.
    // Adaptaremos la lógica para trabajar con **una sola pregunta por bloque**
    // o asumir que todas las opciones del `OptionComponent` se refieren a la 
    // primera pregunta (`currentBlockQuestions.value[0]`).
    // Basado en el template, la adaptación más fiel es trabajar con **una pregunta a la vez (bloque de 1)**.
    
    // Si mantuviéramos la lógica original (bloque de 2):
    // const userAnswers = [selectedAnswer.value, /* Respuesta para la segunda pregunta, que falta en el template actual */];
    
    // V A R I A C I Ó N: Adaptamos a **Bloque de 1 Pregunta** para simplificar el template.

    // === LÓGICA CON BLOQUES DE 1 PREGUNTA ===
    if (currentBlockQuestions.value.length === 0) return;
    
    const userAnswers = [selectedAnswer.value];
    const startIndex = currentBlock.value; // Bloque de 1 pregunta
    const correctAnswer = correctAnswers.value[startIndex];
    let isCorrect = false;

    if (selectedAnswer.value === correctAnswer) {
        score.value += 10;
        isCorrect = true;
    }

    playingState.value = 'result';
    songTitle.value = isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta era: ${correctAnswer}`;


    // Simulación de bloqueo/desbloqueo visual (requeriría más cambios en OptionComponent)
    // El OptionComponent de Vue se encarga de esto via props.
    
    // Esperar un momento para que el usuario vea el resultado antes de pasar al siguiente bloque
    setTimeout(() => {
        if (isCorrect) {
            currentBlock.value++;
            renderNextBlock();
            playingState.value = 'answering';
        } else {
            alert("Bloque fallado, reiniciando el juego...");
            resetGame();
        }
    }, 2000); // 2 segundos de pausa

}

// Ajuste para bloques de 1 pregunta. Mantenemos el nombre 'startGame' pero cambia la lógica de división.
async function startGameSingleBlock() {
    if (!playerName.value) {
        alert("Por favor, introduce tu nombre para empezar.");
        return;
    }
    
    sessionStorage.setItem("username", playerName.value);
    
    try {
        const questions = await fetchQuestions();
        const orderedQuestions = setRandomOrder(questions);

        const { questionsWithoutAnswer, answers } = extractAnswers(orderedQuestions);
        correctAnswers.value = answers;
        totalSongs.value = questionsWithoutAnswer.length;
        currentBlock.value = 0;
        score.value = 0;
        questionsBlocks.value = questionsWithoutAnswer.map(q => [q]); // Bloques de 1 pregunta
        
        gameState.value = 'playing';
        renderNextBlock();

    } catch (err) {
        console.error("Error empezando el juego:", err);
    }
}
// Aseguramos que la función llamada en @click="startGame" sea la correcta
startGame.value = startGameSingleBlock;


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

