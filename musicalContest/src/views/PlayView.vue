<template>
  <section class="bg-gradient-primary h-screen flex justify-center">
    <div
      class="max-w-xl text-center my-auto mx-auto w-full gap-y-6 p-8 bg-white rounded-lg flex flex-col justify-center"
    >
      <div class="flex flex-col justify-center gap-2 items-center">
        <IconComponent icon="music" class="w-16 h-16 bg-gradient-primary text-white text-2xl" />
        <h3 class="text-lg text-primary">¡Adivina la canción!</h3>
        <p class="text-primary-light">
          Escucha fragmentos de 5 segundos y adivina el título correcto
        </p>
      </div>
      <div class="flex flex-col items-start gap-y-2 justify-start">
        <IconListComponent icon="1" text="Esucha el fragmento de la canción" />
        <IconListComponent icon="2" text="Elige la respuesta correcta entre 4 opciones"/>
        <IconListComponent icon="star" text="Gana 10 puntos por cada respuesta correcta"/>
      </div>
      <InputComponent placeholder="Introduce tu nombre" icon="user" label="Tu nombre"/>
      <ButtonComponent icon="play" label="Comenzar el juego" class="bg-gradient-primary"/>
    </div>
  </section>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import IconComponent from '@/components/IconComponent.vue'
import IconListComponent from '@/components/IconListComponent.vue'
import InputComponent from '@/components/InputComponent.vue';
</script>