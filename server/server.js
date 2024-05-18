require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Route for handling chat functionality with OpenAI
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.content;
  try {
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await openAiResponse.json();

    if (openAiResponse.ok) {
      res.json({ choices: data.choices });
    } else {
      res.status(openAiResponse.status).json({ error: "Failed to fetch response from OpenAI" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route for handling API key submission
app.post('/api/keys', (req, res) => {
  const springerApiKey = req.body.springerApiKey;
  const googleScholarApiKey = req.body.googleScholarApiKey;

  console.log('Received Springer API Key:', springerApiKey);
  console.log('Received Google Scholar API Key:', googleScholarApiKey);

  res.json({ message: 'API Keys received successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
