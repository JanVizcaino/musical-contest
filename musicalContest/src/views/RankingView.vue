<template>
  <section class="bg-white h-screen flex justify-center flex-col items-center p-4 gap-y-12">
    <div class="flex justify-center flex-col items-center p-4 gap-y-4">
      <IconComponent icon="ranking-star" class="bg-gradient-primary p-2 w-22 h-22 text-4xl" />

      <p class="text-primary text-2xl">Tabla de clasificación</p>
      <p class="text-black">Los mejores jugadores de todos los tiempos</p>

      <p class="bg-gradient-primary text-sm p-2 rounded-xl">Top 10 Jugadores</p>
    </div>

    <div
      class="max-w-4xl w-full p-8 bg-gradient-primary rounded-2xl shadow-2xl flex flex-col justify-center"
    >
      <div
        v-if="!topPlayers || topPlayers.length === 0"
        class="flex flex-col text-center text-gray-200 py-6 gap-6"
      >
        <IconComponent icon="star" class="text-5xl" />
        <p class="text-xl">No hay resultados aún</p>
        <p>¡Empieza a escribir la historia...!</p>
      </div>

      <RankingCardComponent
        v-else
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
    <div class="flex gap-5">
      <ButtonComponent
        class="bg-white rounded-xl text-primary"
        label="Volver a inicio"
        icon="arrow-left"
        to="/"
      />
      <ButtonComponent
        class="bg-gradient-primary rounded-xl"
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
