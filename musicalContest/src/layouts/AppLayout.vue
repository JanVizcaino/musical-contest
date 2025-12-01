<template>
  <div class="layout min-h-screen flex flex-col font-sans text-gray-100">
    <!-- Header -->
    <AppHeader class="w-full" />

    <!-- Contenido principal -->
    <div class="body-content flex-1 w-full px-2 sm:px-4 md:px-8 py-2 sm:py-4">
      <main class="main-content w-full max-w-7xl mx-auto">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter class="w-full mt-auto" />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>
