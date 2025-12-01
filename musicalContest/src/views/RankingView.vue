<template>
  <section class="bg-white min-h-screen flex flex-col items-center p-4 gap-y-12">
    <!-- HEADER -->
    <div class="flex flex-col items-center p-4 gap-y-4 text-center max-w-md w-full">
      <IconComponent
        icon="ranking-star"
        class="bg-gradient-primary p-4 w-22 h-22 text-4xl rounded-2xl"
      />

      <p class="text-primary text-2xl font-bold">Tabla de clasificación</p>
      <p class="text-black text-sm sm:text-base">Los mejores jugadores de todos los tiempos</p>

      <p class="bg-gradient-primary text-sm p-2 px-4 rounded-xl shadow">
        Top 10 Jugadores
      </p>
    </div>

    <!-- RANKING LIST WRAPPER -->
    <div
      class="w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-gradient-primary rounded-2xl shadow-2xl flex flex-col"
    >
      <!-- EMPTY STATE -->
      <div
        v-if="!topPlayers || topPlayers.length === 0"
        class="flex flex-col text-center text-gray-200 py-10 gap-4"
      >
        <IconComponent icon="star" class="text-5xl" />
        <p class="text-xl font-semibold">No hay resultados aún</p>
        <p class="text-sm sm:text-base">¡Empieza a escribir la historia...!</p>
      </div>

      <!-- RESPONSIVE LIST -->
      <div v-else class="flex flex-col gap-3">
        <RankingCardComponent
          v-for="(ranking, index) in topPlayers"
          :key="index"
          :user="ranking.user"
          :date="ranking.date"
          :score="ranking.score"
          :pos="index + 1"
          :seconds="ranking.timeSeconds"
          :avgSeconds="ranking.avgTimeSeconds"
        />
      </div>
    </div>

    <!-- BUTTONS -->
    <div class="flex flex-col sm:flex-row gap-4">
      <ButtonComponent
        class="bg-white rounded-xl text-primary shadow-md w-full sm:w-auto justify-center"
        label="Volver a inicio"
        icon="arrow-left"
        to="/"
      />
      <ButtonComponent
        class="bg-gradient-primary rounded-xl text-white shadow-md w-full sm:w-auto justify-center"
        label="Jugar ahora"
        icon="play"
        to="/play"
      />
    </div>
  </section>
</template>


<script setup>
import { computed } from 'vue'

import ButtonComponent from '@/components/ButtonComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import RankingCardComponent from '@/components/RankingCardComponent.vue'

import { useRankingStore } from '@/stores/ranking'

const ranking = useRankingStore()
const topPlayers = computed(() => ranking.topPlayers)
</script>
