<template>
  <div
    class="layout min-h-screen flex flex-col bg-primary-light font-sans text-gray-100"
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
      class="bg-primary text-white rounded-t-2xl p-4 text-center shadow-inner"
    />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>
