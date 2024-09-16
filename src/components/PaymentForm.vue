<script setup>
import { ref, computed } from 'vue';
import OrderService from '@/services/OrderService';

const props = defineProps({
  idTicket: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxQuantity: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['orderConfirmed']);

const User = ref(JSON.parse(localStorage.getItem('userData')));
const idUser = computed(() => User.value?.id);

const products = ref(1);
const payment = ref('');
const bookingConfirmed = ref(false);
const error = ref(null);

//Payment methods
const paymentMethods = [
  { id: 'CREDIT_CARD', label: 'Card', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'PAYPAL', label: 'PayPal', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'MAV', label: 'Mav', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4' },
  { id: 'RATE', label: 'Rate ', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' }
];

//Calculate total price
const totalPrice = computed(() => props.price * products.value);

const incrementQuantity = () => {
  if (products.value < props.maxQuantity) {
    products.value++;
  }
};

const decrementQuantity = () => {
  if (products.value > 1) {
    products.value--;
  }
};

const selectPayment = (type) => {
  payment.value = type;
};

const submitBooking = async () => {
  if (!idUser.value) {
    error.value = 'User ID not found. Please log in again.';
    return;
  }

  try {
    const result = await OrderService.createAndConfirmOrder(
      idUser.value,
      props.idTicket,
      products.value,
      payment.value
    );
    console.log('Booking submitted:', result);
    bookingConfirmed.value = true;
    error.value = null;
    emit('orderConfirmed'); // Emit the event when order is confirmed
  } catch (err) {
    console.error('Error submitting booking:', err);
    error.value = 'Failed to submit booking: ' + err.message;
  }
};
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="w-104 h-144 rounded-xl shadow-2xl flex flex-col items-center justify-center bg-white p-8 m-4 tablet:w-128">
      <div class="flex items-center justify-center mb-8 text-xl text-black-gray font-black">
        <h1>Booking Details</h1>
      </div>

      <div class="w-full space-y-6">
        <div class="px-8 rounded-lg">
          <div class="flex items-center justify-between">
            <label for="quantity" class="mr-1 text-sm text-dark-gray font-bold">Select quantity</label>
            <div class="flex items-center rounded-lg tablet:mb-0">
              <button @click="decrementQuantity"
                class="w-10 h-10 rounded-full text-icon-gray shadow-xl hover:text-black transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input type="number" v-model="products" min="1" :max="maxQuantity"
                class="w-12 text-center bg-white text-lg font-bold text-dark-gray focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
              <button @click="incrementQuantity"
                class="w-10 h-10 text-icon-gray rounded-full hover:text-black  shadow-xl transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="px-8 pb-2 rounded-lg">
          <h2 class=" font-bold text-dark-gray mb-4">Payment Method</h2>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="method in paymentMethods" :key="method.id" @click="selectPayment(method.id)"
              :class="{ 'bg-black-gray text-white': payment === method.id, 'bg-white text-dark-gray': payment !== method.id }"
              class="py-3 px-8 rounded-lg font-bold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} :d="method.icon" />
              </svg>
              {{ method.label }}
            </button>
          </div>
        </div>

        <div class="px-8 pb-8 flex justify-end items-center">
          <h3 class="text-md font-bold text-dark-gray">Total Price</h3>
          <p class="text-md font-bold text-black-gray  mx-2">${{ totalPrice.toFixed(2) }}</p>
        </div>
      </div>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <div class="w-80 tablet:w-96 flex space-x-4">
        <button @click="cancelBooking" class="relative overflow-hidden bg-white py-3 text-dark-gray font-bold w-full rounded-xl shadow-xl
                       transition-all duration-300 ease-in-out
                       hover:text-white group hover:shadow-lg" type="button">
          <span class="relative z-10">Cancel</span>
          <div
            class="absolute inset-0 bg-black-gray shadow-xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>

        <button @click="submitBooking" :disabled="!payment" class="relative overflow-hidden bg-black-gray py-3 text-white font-bold w-full rounded-xl shadow-xl
                       transition-all duration-300 ease-in-out
                       hover:text-dark-gray group hover:shadow-lg" type="button">
          <span class="relative z-10">Book Now</span>
          <div
            class="absolute inset-0 bg-white shadow-xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>