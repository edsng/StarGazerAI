const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const FLICKR_API_KEY = process.env.FLICKR_API_KEY

app.use(cors());
app.use(express.json());

// Add this right after your imports
console.log('Environment check on startup:');
console.log('PORT:', process.env.PORT);
console.log('FLICKR_API_KEY present:', !!process.env.FLICKR_API_KEY);
console.log('FLICKR_API_KEY length:', process.env.FLICKR_API_KEY?.length);

// Route to interact with OpenAI API
app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  // Updated model
        messages: [              // Updated format
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
      },
      {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data?.error?.message || 'Error calling OpenAI API');
  }
});

app.post('/api/perplexity', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  const requestBody = {
    model: "llama-3.1-sonar-small-128k-online",  // Specified model
    messages: [
      { role: "system", content: "Be precise and concise. Keep under 3 sentences." },
      { role: "user", content: query }
    ],
    max_tokens: 150,
    temperature: 0.7,
    top_p: 0.9,
    return_citations: true,
    return_images: false,
    return_related_questions: false,
    search_recency_filter: "month",
    top_k: 0,
    stream: false,
    presence_penalty: 0,
    frequency_penalty: 1
  };

  try {
    console.log('Sending request to Perplexity API:', requestBody);

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Perplexity API response:', response.data);
    res.json({ content: response.data.choices[0].message.content });

  } catch (error) {
    console.error('Perplexity API Error Details:', {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      headers: error.response?.headers,
      requestConfig: error.config
    });

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      error: error.response?.data?.error?.message || error.message,
      details: error.response?.data || "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
