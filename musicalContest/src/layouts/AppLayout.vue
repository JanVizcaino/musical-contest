<template>
  <div
    class="layout min-h-screen flex flex-col bg-[var(--color-primary-light)] font-[var(--font-sans)] text-gray-100"
  >
    <AppHeader class="shadow-md bg-[var(--color-primary)] text-white rounded-b-2xl p-4" />

    <div class="body-content flex-1 p-6">
      <main
        class="main-content bg-white text-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-200 ease-in-out hover:shadow-xl"
      >
        <!-- Aquí va el contenido principal -->
      </main>
    </div>

    <AppFooter
      class="bg-[var(--color-primary)] text-white rounded-t-2xl p-4 text-center shadow-inner"
    />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>
