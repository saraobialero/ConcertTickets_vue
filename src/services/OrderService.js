import axiosInstance from '@/api';

const OrderService = {
  async getOrders(idUser) {
    try {
      const response = await axiosInstance.get(`/orders/${idUser}`);
      console.log('Risposta API:', response);
      return response.data.data;
    } catch (error) {
      console.error('OrderService: Error getting concert data', error);
      throw error;
    }
  },

  async createAndConfirmOrder(idUser, idTicket, qta, paymentType) {
    try {
      const response = await axiosInstance.post(
        `/orders/user/${idUser}/${idTicket}/${qta}`,
        {
          paymentType: paymentType,
        }
      );
      console.log('Order creation response:', response);
      return response.data.data;
    } catch (error) {
      console.error('OrderService: Error creating and confirming order', error);
      throw error;
    }
  },
};

export default OrderService;
