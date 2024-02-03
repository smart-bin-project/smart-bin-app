import axios from 'axios';

class SmartBinClient {
  async getSmartBinById(binNumber: number): Promise<any> {
    try {
      const response = await axios.get(`http://192.168.0.4:8081/smartbins/${binNumber}`); 
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching smart bin by ID:', error);
      throw new Error('Failed to fetch smart bin by ID');
    }
  }
}

export default SmartBinClient;
