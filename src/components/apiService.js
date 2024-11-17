import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const callOpenAI = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/openai`, { prompt });
    return response.data;

  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to server. Please make sure the server is running.');
    }
    console.error('Error calling OpenAI API:', error);
    throw error;
  }

};

export const callPerplexity = async (query) => {
    try {
      console.log('Sending query to server:', query);
      const response = await axios.post(`${API_BASE_URL}/perplexity`, { query });
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to server. Please make sure the server is running.');
      }
      // Log the full error for debugging
      console.error('Full error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data
      });
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  };

// Route to handle Flickr image search
