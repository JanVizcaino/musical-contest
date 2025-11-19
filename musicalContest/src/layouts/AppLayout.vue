<template>
  <div
    class="layout min-h-screen flex flex-col font-sans text-gray-100"
  >
    <AppHeader class="bg-white text-white p-4" />

    <div class="body-content flex-1">
      <main
        class="main-content"
      >
        <router-view />
      </main>
    </div>

    <AppFooter
    />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>
