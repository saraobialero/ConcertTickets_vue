<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const backToHome = () => {
  router.push('/');
}

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center w-60">
    <!-- 404 -->
    <h1 class="z-10 text-6xl font-black text-black leading-none">404</h1>
    <div class="h-auto absolute">
    </div>

    <!-- Content -->
    <h3 class="text-gray-p text-center mb-2">Oops! you missed? Don't worry, you'll find your way and return </h3>
    <div class="w-36">
      <button @click="backToHome" class="relative overflow-hidden bg-black-gray py-3 text-white font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none" type="submit">
        <span class="relative z-10">Home</span>
        <div
          class="absolute inset-0 bg-white shadow-inner transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
        </div>
      </button>
    </div>

  </div>
</template>