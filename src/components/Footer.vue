<script setup>
// Any necessary imports or setup logic would go here
</script>

<template>
  <!-- FOOTER -->
  <footer>
    <!-- Footer container -->
    <div class="flex flex-col items-center justify-between py-10 px-4 bg-gray-100">
      <!-- Container logo nav -->
      <div class="p-2 mb-8 flex flex-col items-center w-full tablet:flex-row tablet:justify-between">
        <!-- Logo in footer -->
        <div class="flex items-center mb-4 font-black order-first tablet:order-last">
          <RouterLink name="home" to="/">
            <div class="flex flex-col items-center tablet:flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="size-8 mb-2 tablet:mr-1 tablet:mb-0">
                <path
                  d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
              </svg>
              <!-- Text -->
              <p class="hidden tablet:flex">MusicDays</p>
            </div>
          </RouterLink>
        </div>

        <!-- Footer nav -->
        <ul class="flex justify-center mb-4 text-sm text-gray-p">
          <li class="px-4 py-2">
            <RouterLink name="about" to="/" class="text-middle font-semibold hover:text-black-gray">
              About Us
            </RouterLink>
          </li>
          <li class="px-4 py-2">
            <RouterLink name="services" to="/" class="text-middle font-semibold hover:text-black-gray">
              Services
            </RouterLink>
          </li>
          <li class="px-4 py-2">
            <RouterLink name="contact" to="/" class="text-middle font-semibold hover:text-black-gray">
              Contact
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Footer social icons -->
      <div class="flex justify-center mb-2 text-icon-gray text-md">
        <a href="https://facebook.com" target="_blank" class="mx-2 hover:text-black-gray">
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
        <a href="https://twitter.com" target="_blank" class="mx-2 hover:text-black-gray">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
        <a href="https://linkedin.com" target="_blank" class="mx-2 hover:text-black-gray">
          <font-awesome-icon :icon="['fab', 'square-twitter']" />
        </a>
      </div>

      <!-- FOOTER COPYRIGHT -->
      <div class="text-custom-xs text-icon-gray">
        &copy; 2024 MusicDays All rights reserved.
      </div>
    </div>
  </footer>
</template>