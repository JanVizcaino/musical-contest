<template>
  <header
    class="bg-[var(--color-primary)] text-white p-4 flex justify-center shadow-md rounded-b-2xl transition-all duration-200 ease-in-out"
  >
    <nav class="flex space-x-4">
      <HomeButtonNav />
      <PlayButtonNav />
      <RankingButtonNav />
    </nav>
  </header>
</template>

<script setup>
import HomeButtonNav from '../components/HomeButtonNav.vue'
import PlayButtonNav from '../components/PlayButtonNav.vue'
import RankingButtonNav from '../components/RankingButtonNav.vue'
</script>
