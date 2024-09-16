<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div>
    <Header />
    <main class="min-h-full flex flex-col items-center justify-center bg-gray-100">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
