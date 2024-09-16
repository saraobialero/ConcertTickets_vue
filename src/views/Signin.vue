<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from '@/composable/userAuth';

const { signin } = userAuth();

const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const surname = ref('');
const errorMessage = ref('');

const handleSignin = async () => {
  errorMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    const userData = await signin({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      name: name.value,
      surname: surname.value
    });

    if (userData && userData.access_token) {
      router.push('/');
    } else {
      console.error('Sign-in successful but no access token received');
      errorMessage.value = 'Please try again later.';
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage.value = 'Invalid input. Please check your details.';
          break;
        case 500:
          // Check if the error message indicates that the email is already in use
          if (error.response.data && error.response.data.message && error.response.data.message.includes('Email already exists')) {
            errorMessage.value = 'This email is already in use. Please use a different email.';
          } else {
            errorMessage.value = 'An error occurred during sign-in. Please try again later.';
          }
          break;
        default:
          errorMessage.value = 'An error occurred during sign-in. Please try again later.';
      }
    } else {
      errorMessage.value = 'An error occurred during sign-in. Please try again later.';
    }
  }
};
</script>

<template>
  <!-- Form -->
  <div class="text-custom-xs w-104 h-128 rounded-xl shadow-2xl flex flex-col items-center justify-center">
    <!-- Logo -->
    <div class="flex items-center justify-center mb-10 text-desktop-xl text-black-gray font-black">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 mr-1">
        <path
          d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
      </svg>
      <p>Company</p>
    </div>
    <form class="w-64" @submit.prevent="handleSignin">
      <div class="mb-4">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="name"
          type="text" placeholder="Name" required>
      </div>
      <div class="mb-4">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="surname"
          type="text" placeholder="Surname" required>
      </div>
      <div class="mb-4">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="email"
          type="email" placeholder="Email" required>
      </div>
      <div class="mb-4">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="password"
          type="password" placeholder="Password" required>
      </div>
      <div class="mb-10">
        <input class="w-full text-dark-gray px-4 py-3 rounded-xl shadow-xl focus:outline-none" v-model="confirmPassword"
          type="password" placeholder="Confirm Password" required>
      </div>

      <div class="flex items-center justify-center">
        <div v-if="errorMessage" class="w-72 text-center text-danger font-bold mb-4">
          {{ errorMessage }}
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex items-center justify-center">
        <!-- Home -->

        <button class="relative overflow-hidden bg-white text-black-gray mr-2 py-3 font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-white group hover:shadow-none" type="submit">
          <router-link to="/">
            <span class="relative z-10">Back</span>
            <div
              class="absolute inset-0 bg-black-gray shadow-inner-strong transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
            </div>
          </router-link>
        </button>

        <!-- Signup -->
        <button class="relative overflow-hidden bg-black-gray ml-2 py-3 text-white font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none" type="submit">
          <span class="relative z-10">Sign Up</span>
          <div
            class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </form>
  </div>
</template>