<script setup>
import { ref, computed } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const showDetails = ref(false);

const totalPrice = computed(() => {
  return (props.order.qta * parseFloat(props.order.ticket.price)).toFixed(2);
});

const generatePDF = () => {
  const element = document.getElementById(`order-${props.order.id}`);
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order-${props.order.id}.pdf`);
  });
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div class="w-128">

    <div :id="`order-${order.id}`"
      class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 px-14 py-12">

      <div class="flex justify-between items-center mb-4">
        <div class=" flex items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 mr-1">
            <path
              d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
          </svg>
          <h2 class="text-lg font-black text-black-gray">Order #{{ order.id }}</h2>
        </div>

        <span class="text-sm font-medium text-icon-gray">Payment: {{ order.paymentType }}</span>
      </div>

      <div class="mb-4">
        <p class="text-sm font-bold text-dark-gray">Quantity: {{ order.qta }}</p>
        <p class="text-xs font-medium text-dark-gray">Total: ${{ totalPrice }}</p>
      </div>

      <div v-if="showDetails" class="space-y-1 mt-6">
        <h3 class="text-lg font-black ">Ticket Details:</h3>
        <ul class="text-xs text-icon-gray">
          <li>Band: {{ order.ticket.band }}</li>
          <li>City: {{ order.ticket.city }}</li>
          <li>Location: {{ order.ticket.location }}</li>
          <li>Price per ticket: ${{ order.ticket.price }}</li>
        </ul>
        <p class="text-sm font-medium text-icon-gray">Seller: {{ order.ticket.seller.companyName }}</p>
      </div>

      <!-- Buttons -->
      <div class="mt-4 flex items-center justify-center space-x-4">
        <button @click="toggleDetails" class="relative overflow-hidden bg-white text-black-gray py-3 font-bold w-full rounded-xl shadow-xl
               transition-all duration-300 ease-in-out
               hover:text-white group hover:shadow-none" type="button">
          <span class="relative z-10">{{ showDetails ? 'Hide Details' : 'Show Details' }}</span>
          <div
            class="absolute inset-0 bg-black-gray shadow-inner-strong transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>

        <button @click="generatePDF" class="relative overflow-hidden bg-black-gray py-3 text-white font-bold w-full rounded-xl shadow-xl
               transition-all duration-300 ease-in-out
               hover:text-black-gray group hover:shadow-none" type="button">
          <span class="relative z-10">Print Order</span>
          <div
            class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>