import axios from 'axios';

// Create an Axios instance pointing to FastAPI
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  /**
   * Mock endpoint for basic prediction
   * @param {Object} data - Form data
   */
  async predictBasic(data) {
    const response = await apiClient.post('/predict/basic', data);
    return response.data;
  },

  /**
   * Mock endpoint for advanced prediction
   * @param {Object} data - Form data
   */
  async predictAdvanced(data) {
    const response = await apiClient.post('/predict/advanced', data);
    return response.data;
  },

  /**
   * Send CSV via multipart form data for batch prediction
   */
  async predictBatch(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/predict/batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default apiClient;
