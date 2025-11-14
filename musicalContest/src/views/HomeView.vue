<template>
  <section>
    <div class="max-w-xl text-center mx-auto w-full py-16 space-y-12">
        <div class="space-y-4">
            <h1 class="text-4xl">
                ¿Cuanto sabes de música?
            </h1>
            <p>Pon a prueba tu conocimiento musical. Esucha fragmentos de 5 segundos y adivina la canción correcta entre 4 opciones ¡Compite por las mejores puntuaciones!</p>
        </div>
        <div class="flex justify-center gap-8">
            <ButtonComponent variant="primary" label="Comenzar a jugar" icon="play" to="/play"  />
            <ButtonComponent variant="secondary" label="See ranking" icon="star" to="/ranking" />
        </div>
    </div>
</section>
<section class="bg-white text-primary">
    <div class="max-w-5xl text-center mx-auto w-full py-16 space-y-12">
        <div class="space-y-4">
            <h1 class="text-3xl">
                ¿Cómo funciona?
            </h1>
            <p>Un juego simple pero adictivo que pondrá a prueba tus conocimientos musicales</p>
        </div>
        <div class="gap-4 grid grid-cols-3">
            <InfoCard title="Escucha" icon="headphones" description="Reproduce un fragmento de 5 segundos de una canción popular" color="bg-primary" />
            <InfoCard title="Adivina" icon="bullseye" description="Elige la respuesta correcta entre 4 opciones posibles" color="bg-secondary"/>
            <InfoCard title="Compite" icon="ranking-star" description="Gana 10 puntos por respuesta correcta y sube en el ranking" color="bg-accent"/>
        </div>
    </div>
</section>
<section class="h-64 w-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center text-white">
    <div class="max-w-5xl flex gap-62 text-center mx-auto">
        <StatComponent stat="100" title="Puntos máximos"/>
        <StatComponent stat="10" title="Preguntas por partida" />
        <StatComponent stat="5s" title="Por canción"/>
    </div>
</section>
<section class="bg-white">
    <div class="max-w-xl flex flex-col items-center text-center gap-4 mx-auto bg-gradient-to-r from-primary via-secondary to-accent rounded-xl p-12">
            <font-awesome-icon icon="star" class="text-2xl text-white p-4" />
            <p>¿Listo para el desafío?</p>
            <p>Demuestra que eres un experto musical y alcanza el top en el ranking</p>
            <ButtonComponent variant="secondary" label="Empezar ahora" icon="play" to="/play" />
    </div>
</section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import InfoCard from '@/components/InfoCard.vue';
import StatComponent from '@/components/StatComponent.vue';

</script>
