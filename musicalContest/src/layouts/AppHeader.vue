<template>
  <header
    class=" text-white p-2 sm:p-4 flex justify-center shadow-md transition-all duration-200 ease-in-out"
  >
    <nav class="flex flex-col sm:flex-row items-center sm:space-x-3 md:space-x-4 gap-2 sm:gap-0">
      <ButtonComponent
        class="bg-secondary rounded-xl px-3 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base"
        label="Home"
        icon="home"
        to="/"
      />
      <ButtonComponent
        class="bg-secondary rounded-xl px-3 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base"
        label="Play"
        icon="play"
        to="/play"
      />
      <ButtonComponent
        class="bg-secondary rounded-xl px-3 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base"
        label="Ranking"
        icon="star"
        to="/ranking"
      />
    </nav>
  </header>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
</script>
