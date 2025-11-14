<template>
  <header class="bg-primary text-white p-4 flex justify-center shadow-md transition-all duration-200 ease-in-out">
    <nav class="flex space-x-4">
      <ButtonComponent variant="secondary" label="Home" icon="home" to="/" />
      <ButtonComponent variant="secondary" label="Play" icon="play" to="/play" />
      <ButtonComponent variant="secondary" label="Ranking" icon="star" to="/ranking" />
    </nav>
  </header>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
</script>

