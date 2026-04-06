import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Update this when real backend is ready
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Mock endpoint for basic prediction
   * @param {Object} data - Form data
   */
  async predictBasic(data) {
    // Simulate network delay
    await delay(1500);
    
    const prob = Math.random();
    let severity = "Low";
    if (prob > 0.7) severity = "High";
    else if (prob > 0.3) severity = "Moderate";

    // Return mock random probability between 0 and 1
    return {
      success: true,
      probability: prob,
      insights: `Predicted risk is ${severity}. This is a mock insight generated for the basic prediction based on topography (${data.topography}), dams (${data.dams}), and population (${data.population}) scores.`
    };
  },

  /**
   * Mock endpoint for advanced prediction
   * @param {Object} data - Form data
   */
  async predictAdvanced(data) {
    await delay(2000);
    
    return {
      success: true,
      probability: Math.random(),
      insights: "This is a detailed insight for the advanced environmental factors showing complex interactions."
    };
  }
};

export default apiClient;
