<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from '@/composable/userAuth';

import AnimatedMenuIcon from './AnimatedMenuIcon.vue';

const { logout } = userAuth();

const User = ref(JSON.parse(localStorage.getItem('userData')));
const name = User.value.name;


const router = useRouter();
const isDropdownOpen = ref(false);


watch(() => router.currentRoute.value.path, () => {
  isDropdownOpen.value = false;
});

const exitAndRemoveData = () => {
  logout();
  router.push('/login');
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

</script>

<template>
  <header class="relative z-50">
    <nav class="fixed bg-gray-100 w-full flex py-4 px-4 justify-between items-center text-black rounded-b-2xl">
      <ul class="flex justify-center items-center mt-1">
        <!-- Logo -->
        <li class="font-black text-black">
          <RouterLink name="home" to="/">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 mr-1">
                <path
                  d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
              </svg>
              <!-- Text -->
              <p>MusicDays</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- Menu -->
      <ul class="flex justify-center items-center">
        <li class="p-2">

          <!--AnimatedMenuIcon -->
          <AnimatedMenuIcon :is-open="isDropdownOpen" @toggle="toggleDropdown" class="absolute z-50" />

          <!-- Backdrop -->
          <div v-if="isDropdownOpen" class="fixed inset-0  backdrop-blur-md z-10" @click="isDropdownOpen = false"></div>
          <!-- Div drop-down menu -->
          <ul :class="{ 'block': isDropdownOpen, 'hidden': !isDropdownOpen }"
            class="fixed text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 z-50 w-96 h-104 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center text-sm text-dark-gray">
            <!-- Welcome -->
            <li class="font-black text-lg text-primary mb-2 w-full py-2 flex flex-col items-center justify-center">
              <!-- Icon -->
              <div class="flex items-center bg-white justify-center h-20 w-20 rounded-full shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#181818" class="h-8 w-8 ">
                  <path fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              Hello {{ name }}!
            </li>

            <!-- Voices -->
            <div class="mb-6">
              <li class="py-2 cursor-pointer font-medium text-gray-p  hover:text-black-gray ">
                <RouterLink name="orders" to="/orders">Your prenotation</RouterLink>
              </li>
              <li class="py-2 cursor-pointer font-medium text-gray-p  hover:text-black-gray ">
                <RouterLink name="home" to="/">Back to home!</RouterLink>
              </li>
            </div>

            <!-- Btn -->
            <li class="p-2 cursor-pointer">
              <!-- Logout -->
              <button @click="exitAndRemoveData" class="mx-2 relative overflow-hidden bg-black-gray py-3 text-white font-bold w-40 rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none" type="submit">
                <span class="relative z-10">Logout</span>
                <div
                  class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
                </div>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>
