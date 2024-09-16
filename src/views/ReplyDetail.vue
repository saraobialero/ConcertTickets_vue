<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PaymentForm from '@/components/PaymentForm.vue';
import ReplyService from '@/services/ReplyService';

const route = useRoute();
const replyData = ref(null);
const loading = ref(true);
const error = ref(null);
const orderConfirmed = ref(false);

onMounted(async () => {
  const idReply = route.params.id;
  if (!idReply) {
    error.value = 'No reply ID provided';
    loading.value = false;
    return;
  }

  try {
    const response = await ReplyService.getReplyDetail(idReply);
    console.log('Raw response:', response);

    replyData.value = response;
    console.log('Processed reply data:', replyData.value);

    loading.value = false;
  } catch (err) {
    console.error('Error fetching reply details:', err);
    error.value = 'Failed to load reply details: ' + err.message;
    loading.value = false;
  }
});

const formatDate = (dateArray) => {
  if (Array.isArray(dateArray) && dateArray.length === 3) {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return 'Invalid Date';
};

const handleOrderConfirmed = () => {
  orderConfirmed.value = true;
};
</script>

<template>
  <section class="flex items-center justify-center tablet:flex-row pt-36 tablet:pt-0">

    <!-- Order confirmed block -->
    <div v-if="orderConfirmed"
      class="h-96 w-128 bg-white text-center flex flex-col tablet:flex-row items-center justify-center shadow-2xl rounded-xl">
      <div class="">
        <h2 class="text-xl font-black text-black-gray">Order Confirmed!</h2>
        <p class="text-md font-medium text-dark-gray mb-6">Thank you for your purchase.</p>
        <!-- Buttons -->
        <div class=" flex w-72">
          <button class="relative overflow-hidden bg-white text-black-gray mr-2 py-3 font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-white group hover:shadow-none" type="submit">
            <Router-link to="/">
              <span class="relative z-10">Back to replies</span>
              <div
                class="absolute inset-0 bg-black-gray shadow-inner-strong transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
              </div>
            </Router-link>
          </button>

          <!-- Signup -->
          <button class="relative overflow-hidden bg-black-gray ml-2 py-3 text-white font-bold w-full rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none" type="submit">
            <RouterLink name="orders" to="/orders">
              <span class="relative z-10">View orders</span>
              <div
                class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
              </div>
            </RouterLink>
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div v-else class="flex flex-col items-center justify-center tablet:flex-row">
      <div
        class="mx-6 w-96 h-144 bg-white flex  tablet:flex-row items-center justify-center rounded-lg shadow-2xl tablet:w-128">
        <div v-if="loading">
          <p>Loading product details...</p>
        </div>
        <div v-else-if="error">
          <p class="text-danger">{{ error }}</p>
        </div>

        <div v-else-if="replyData" class="w-88 h-80 flex flex-col justify-center">
          <h1 class="text-xl font-black mb-2 ">Product details</h1>
          <div class="text-gray-p mb-4">
            <p><strong> Reply ID: </strong>{{ replyData.id }}</p>
            <p><strong>Reply Date:</strong> {{ formatDate(replyData.replyDate) }}</p>
            <p><strong>Band:</strong> {{ replyData.ticket.band }}</p>
            <p><strong>City: </strong>{{ replyData.ticket.city }}</p>
            <p><strong>Location:</strong> {{ replyData.ticket.location }}</p>
            <p><strong>Quantity:</strong> {{ replyData.ticket.qta }}</p>
            <p><strong>Price:</strong> {{ replyData.ticket.price }}$</p>
            <p><strong>Company:</strong> {{ replyData.ticket.seller.companyName }}</p>
          </div>
          <div class="text-custom-xs text-icon-gray ">
            <p><strong>All shows begin at 8:00 PM sharp.</strong>
              When attending concerts, it's advisable to arrive early to avoid queues and find your seat comfortably.
              Always
              bring your ticket, either printed or digital, and be prepared to show identification if required.</p>
          </div>
        </div>
        <div v-else>
          <p>No data available</p>
        </div>
      </div>
      <div class="py-20">
        <PaymentForm v-if="replyData" :idTicket="replyData.ticket.id" :price="replyData.ticket.price"
          :maxQuantity="replyData.ticket.qta" @orderConfirmed="handleOrderConfirmed" />
      </div>
    </div>
  </section>
</template>