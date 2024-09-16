import axiosIstance from '@/api';

const UserService = {
  async getUser() {
    try {
      const response = await axiosIstance.get('/user/');
      // console.log('UserService: Received response', response.data);
      return response.data.data; // Restituisce direttamente i dati
    } catch (error) {
      console.error('UserService: Error getting user data', error);
      throw error;
    }
  },
};

export default UserService;
