import axiosIstance from '@/api';

const ReplyService = {
  async getReplies() {
    try {
      const response = await axiosIstance.get('/replies/');
      console.log('Risposta API:', response);
      return response.data.data;
    } catch (error) {
      console.error('ReplyService: Error getting concert data', error);
      throw error;
    }
  },

  async getReplyDetail(idReply) {
    try {
      const response = await axiosIstance.get(`/replies/detail/${idReply}`);
      console.log('Risposta API:', response);
      return response.data.data;
    } catch (error) {
      console.error('ReplyService: Error getting concert data', error);
      throw error;
    }
  },
};
export default ReplyService;
