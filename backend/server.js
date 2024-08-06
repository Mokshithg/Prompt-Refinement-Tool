const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// OpenAI API Key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Route to handle prompt requests
app.post('/api/test-prompt', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // Updated API URL
            {
                model: "gpt-3.5-turbo", // Update to a supported model
                messages: [{ role: "user", content: prompt }], // Chat-based format
                max_tokens: 50, // Limit the length of responses
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(error.response ? error.response.status : 500).json({
            error: error.response ? error.response.data : 'Failed to fetch response'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
