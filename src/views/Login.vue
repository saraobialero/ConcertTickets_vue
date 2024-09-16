<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { userAuth } from '@/composable/userAuth';

const { login } = userAuth();

const router = useRouter();
const email = ref('');
const password = ref('');

const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const userData = await login({
      email: email.value,
      password: password.value
    });

    if (userData && userData.access_token) {
      router.push('/');
    } else {
      console.error('Login successful but no access token received');
      errorMessage.value = 'Please try later.'
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Invalid email or password. Please try again.';
    } else if (error.response && error.response.status === 400) {
      errorMessage.value = 'Error credentials, please try again.';
    } else {
      errorMessage.value = 'An error occurred during login. Please try again later.';
    }
  }
};
</script>

<template>
  <!-- Box for login -->
  <div class="text-custom-xs bg-white w-88 h-104 rounded-xl shadow-2xl flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="flex items-center justify-center mb-10 text-desktop-xl text-black-gray font-black">
      <!-- Svg -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 mr-1">
        <path
          d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
      </svg>
      <p>Company</p>
    </div>
    <form class="w-60" @submit.prevent="handleLogin">
      <!-- EMAIL -->
      <div class=" mb-4">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="email"
          type="text" placeholder="Email" required>
      </div>

      <!-- PSW -->
      <div class="mb-10">
        <input class="w-full  text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="password"
          type="password" placeholder="Password" required>
      </div>

      <!-- ERROR MESSAGE -->
      <div class="flex items-center justify-center">
        <div v-if="errorMessage" class="w-72 text-center text-danger font-bold  mb-4">
          {{ errorMessage }}
        </div>
      </div>

      <!-- BTN -->
      <div class="">
        <button class="relative overflow-hidden bg-black-gray py-3 text-white font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none" type="submit">
          <span class="relative z-10">Login</span>
          <div
            class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>

      <!-- Sign In -->
      <div class="mt-4 text-center">
        <router-link to="/sign-in" class="text-icon-gray font-medium hover:font-bold">
          Don't have an account? Sign up
        </router-link>
      </div>

    </form>
  </div>
</template>
