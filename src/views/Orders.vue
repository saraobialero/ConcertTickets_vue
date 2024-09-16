<script setup>
import { ref, onMounted, computed } from 'vue';
import CardOrder from '@/components/CardOrder.vue';
import OrderService from '@/services/OrderService';

const orders = ref([]);
const loading = ref(true);

const User = ref(JSON.parse(localStorage.getItem('userData')));
const idUser = computed(() => User.value?.id);

onMounted(async () => {
  try {
    const data = await OrderService.getOrders(idUser.value);
    orders.value = data;
    console.log('Orders:', orders.value);
  } catch (err) {
    console.error('Error fetching orders:', err);
    error.value = 'Failed to load orders: ' + err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full pt-36 tablet:py-36">
    <h1 class="text-2xl font-bold text-center mb-2">Your Orders</h1>
    <div v-if="loading" class="text-center">
      Loading orders...
    </div>

    <div v-else-if="error" class="text-danger text-center font-bold">
      <p>"No content for user"</p>
    </div>

    <div v-else-if="orders.length === 0" class="text-center text-danger font-bold">
      You don't have any orders yet.
    </div>

    <div v-else class="grid grid-cols-1 tablet:grid-cols-2 laptop::grid-cols-3 gap-6">
      <CardOrder v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </section>
</template>