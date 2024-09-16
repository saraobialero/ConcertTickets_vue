<script setup>
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService';
import ReplyService from '@/services/ReplyService'
import PersonalDataTable from '@/components/PersonalDataTable.vue';


const user = ref(null);
const error = ref(null);
const otherSection = ref(null);

const replys = ref(null);

onMounted(async () => {
  try {
    const userData = await UserService.getUser();
    user.value = userData;
  } catch (err) {
    error.value = err;
    console.error('Failed to fetch user data:', err);
  }
});

const scrollToOtherSection = () => {
  otherSection.value.scrollIntoView({ behavior: 'smooth' });
};

onMounted(async () => {
  try {
    const data = await ReplyService.getReplies();
    replys.value = data;
    console.log('Reply uploaded:', replys.value);
    return data;
  } catch (error) {
    console.error('Errore nel caricamento dei concerti:', error);
  }

});
</script>

<template>

  <!-- JUMBO -->
  <section
    class="h-screen w-104 flex flex-col items-center justify-center big-smartphone:flex-row big-smartphone:w-200">
    <div class="mb-6 big-smartphone:mr-10 big-smartphone:mb-0">
      <img class="w-48 laptop:w-60" src="https://pngimg.com/d/audio_speakers_PNG11127.png" alt="smartphone">
    </div>
    <!-- text and buttons -->
    <div class="flex flex-col items-center justify-center w-88 big-smartphone:items-baseline laptop:w-104">
      <h1 class="text-black-gray font-black text-3xl leading-none mb-3">Welcome!</h1>
      <h3 class="text-dark-gray font-medium text-custom-xs mb-5 laptop:text-sm">Discover a world of live music on our
        online ticketing platform. Explore thousands of musical events across various genres, all from the comfort of
        your home. Enjoy secure transactions, quick ticket delivery, and excellent customer service. Buy with confidence
        thanks to our flexible refund policy and dedicated support team. Don't miss the chance to experience your
        favorite artists live!</h3>
      <!-- BTN -->
      <div class="flex items-center justify-center w-96 big-smartphone:justify-start">
        <!-- FIRST -->
        <a href="https://github.com/saraobialero" target="_blank">
          <div class="flex items-center justify-center w-40 mr-2 relative overflow-hidden bg-black-gray py-3 text-white font-bold  rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none">
            <span class="relative z-10">Discover </span>
            <div
              class="absolute inset-0 bg-white shadow-inner transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
            </div>
          </div>
        </a>
        <!-- SECOND -->
        <button @click="scrollToOtherSection" class="w-40 ml-2 relative overflow-hidden bg-white py-3 text-dark-gray font-bold rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-white group hover:shadow-none" type="submit">
          <span class="relative z-10">Explore</span>
          <div
            class="absolute inset-0 bg-black-gray shadow-inner transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </div>
  </section>

  <section class="w-104 py-20 tablet:w-128 desktop:w-200">
    <div class="text-gray-p text-sm " data-aos="fade-up" data-aos-anchor-placement="top-center">
      <h3 class="text-black-gray text-lg font-black mb-2">About replies</h3>
      <strong class="text-bold">All shows begin at 8:00 PM sharp.</strong>
      <p>When attending concerts, it's advisable to arrive early to avoid queues and find your seat comfortably. Always
        bring your ticket, either printed or digital, and be prepared to show identification if required. </p>
    </div>
  </section>

  <!-- Data table -->
  <section class="mb-10">
    <div data-aos="fade-up">
      <PersonalDataTable />
    </div>
  </section>

  <!-- Text section -->
  <section ref="otherSection" class="w-104 py-20 tablet:w-128 desktop:w-200">
    <div class="text-gray-p text-sm" data-aos="fade-up" data-aos-anchor-placement="top-center">
      <h3 class="text-black-gray text-lg font-black">Some Rules...</h3>
      <p> Venues typically prohibit professional cameras, glass bottles, outside food, weapons, and illegal substances.
        Respect for fellow concertgoers and artists is paramount; avoid pushing or causing disturbances. While recording
        entire performances is generally not allowed, brief smartphone videos might be tolerated. Official merchandise
        is often available for purchase, though expect queues and higher prices. After the show, follow staff
        instructions for an orderly exit. In case of cancellations, check the organizer's refund policy. If you have
        special accessibility needs, inform the organizer in advance. Many events now promote eco-friendly practices,
        such as using reusable cups. While these guidelines are common, specific policies may vary depending on the
        venue and event organizer. Always check the event's official information for the most accurate and up-to-date
        rules.</p>
    </div>
  </section>

</template>