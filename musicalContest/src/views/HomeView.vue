<template>
  <!-- HERO -->
  <section class="bg-gradient-primary rounded-md">
    <div class="max-w-xl text-center mx-auto w-full py-16 space-y-12 px-4">
      <div class="space-y-4">
        <h1 class="text-4xl sm:text-5xl font-bold">¿Cuánto sabes de música?</h1>
        <p class="text-base sm:text-lg">
          Pon a prueba tu conocimiento musical. Escucha fragmentos de 5 segundos y adivina
          la canción correcta entre 4 opciones. ¡Compite por las mejores puntuaciones!
        </p>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
        <ButtonComponent
          class="bg-primary rounded-xl w-full sm:w-auto"
          label="Comenzar a jugar"
          icon="play"
          to="/play"
        />
        <ButtonComponent
          class="bg-secondary rounded-xl w-full sm:w-auto"
          label="See ranking"
          icon="star"
          to="/ranking"
        />
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="bg-white text-primary rounded-md">
    <div class="max-w-5xl sm:max-w-3xl text-center mx-auto w-full py-16 space-y-12 px-4">
      <div class="space-y-4">
        <h1 class="text-3xl sm:text-4xl font-semibold">¿Cómo funciona?</h1>
        <p class="text-base sm:text-lg">
          Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales.
        </p>
      </div>

      <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <InfoCard
          title="Escucha"
          icon="headphones"
          description="Reproduce un fragmento de 5 segundos de una canción popular"
          iconBg="bg-primary"
        />
        <InfoCard
          title="Adivina"
          icon="bullseye"
          description="Elige la respuesta correcta entre 4 opciones posibles"
          iconBg="bg-secondary"
        />
        <InfoCard
          title="Compite"
          icon="ranking-star"
          description="Gana 10 puntos por respuesta correcta y sube en el ranking"
          iconBg="bg-accent"
        />
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="h-auto py-12 w-full bg-gradient-primary flex items-center justify-center text-white rounded-md">
    <div class="max-w-3xl md:max-w-5xl flex flex-col sm:flex-row gap-12 sm:gap-20 text-center mx-auto px-4">
      <StatComponent stat="100" title="Puntos máximos" />
      <StatComponent stat="10" title="Preguntas por partida" />
      <StatComponent stat="5s" title="Por canción" />
    </div>
  </section>

  <!-- CALL TO ACTION -->
  <section class="bg-white py-8 px-4">
    <div
      class="bg-gradient-primary max-w-xl flex flex-col items-center text-center gap-4 mx-auto rounded-xl p-12"
    >
      <IconComponent icon="star" class="text-3xl text-white" />
      <h1 class="text-xl sm:text-2xl font-semibold">¿Listo para el desafío?</h1>
      <p class="text-white/90">Demuestra que eres un experto musical y alcanza el top en el ranking.</p>

      <ButtonComponent
        class="bg-white text-secondary rounded-xl w-full sm:w-auto"
        label="Empezar ahora"
        icon="play"
        to="/play"
      />
    </div>
  </section>

  <!-- COPYRIGHT -->
  <section class="bg-gradient-to-r from-primary to-secondary py-12 px-4 rounded-md">
    <div class="max-w-3xl mx-auto text-center px-6 space-y-4">
      <IconComponent icon="copyright" class="text-6xl mx-auto" />
      <h2 class="text-2xl font-bold text-white">Aviso de Copyright</h2>
      <p class="text-white/90 text-base sm:text-lg">
        Todas las canciones utilizadas en este juego están protegidas por derechos de autor.
        Este contenido se utiliza exclusivamente con fines educativos y de homenaje a los artistas.
        No se obtiene ningún beneficio económico de ninguna manera.
      </p>
    </div>
  </section>
</template>


<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import IconComponent from '@/components/IconComponent.vue'
import InfoCard from '@/components/InfoCard.vue'
import StatComponent from '@/components/StatComponent.vue'
</script>
