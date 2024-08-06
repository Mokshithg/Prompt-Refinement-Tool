import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/test-prompt', {
              prompt: prompt,
              max_tokens: 50,
              temperature: 0.7
          });
            setResponse(res.data.choices[0].text);
        } catch (err) {
            setError('Failed to fetch response');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Prompt Refinement Tool</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="6"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Submit'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-xl font-semibold">Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default App;
