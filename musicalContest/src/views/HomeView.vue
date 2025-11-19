<template>
  <section class="bg-gradient-primary">
    <div class="max-w-xl text-center mx-auto w-full py-16 space-y-12">
      <div class="space-y-4">
        <h1 class="text-4xl">¿Cuanto sabes de música?</h1>
        <p>
          Pon a prueba tu conocimiento musical. Esucha fragmentos de 5 segundos y adivina la canción
          correcta entre 4 opciones ¡Compite por las mejores puntuaciones!
        </p>
      </div>
      <div class="flex justify-center gap-8">
        <ButtonComponent class="bg-primary" label="Comenzar a jugar" icon="play" to="/play" />
        <ButtonComponent class="bg-secondary" label="See ranking" icon="star" to="/ranking" />
      </div>
    </div>
  </section>
  <section class="bg-white text-primary">
    <div class="max-w-5xl sm:max-w-3xl text-center mx-auto w-full py-16 space-y-12">
      <div class="space-y-4">
        <h1 class="text-3xl">¿Cómo funciona?</h1>
        <p>Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales</p>
      </div>
      <div class="gap-4 grid grid-cols-3">
        <InfoCard
          title="Escucha"
          icon="headphones"
          description="Reproduce un fragmento de 5 segundos de una canción popular"
          customColor="bg-primary"
        />
        <InfoCard
          title="Adivina"
          icon="bullseye"
          description="Elige la respuesta correcta entre 4 opciones posibles"
          customColor="bg-secondary"
        />
        <InfoCard
          title="Compite"
          icon="ranking-star"
          description="Gana 10 puntos por respuesta correcta y sube en el ranking"
          customColor="bg-accent"
        />
      </div>
    </div>
  </section>
  <section
    class="h-64 w-full bg-gradient-primary flex items-center justify-center text-white"
  >
    <div class="max-w-3xl md:max-w-5xl flex gap-22 md:gap-62 text-center mx-auto">
      <StatComponent stat="100" title="Puntos máximos" />
      <StatComponent stat="10" title="Preguntas por partida" />
      <StatComponent stat="5s" title="Por canción" />
    </div>
  </section>
  <section class="bg-white py-8">
    <div
      class="bg-gradient-primary max-w-xl flex flex-col items-center text-center gap-4 mx-auto rounded-xl p-12"
    >
      <IconComponent icon="star" class="text-3xl text-white" />
      <h1 class="text-xl">¿Listo para el desafío?</h1>
      <p>Demuestra que eres un experto musical y alcanza el top en el ranking</p>
      <ButtonComponent class="bg-white text-secondary" label="Empezar ahora" icon="play" to="/play" />
    </div>
  </section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import IconComponent from '@/components/IconComponent.vue';
import InfoCard from '@/components/InfoCard.vue'
import StatComponent from '@/components/StatComponent.vue'
</script>
