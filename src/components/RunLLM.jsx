import '../css/RunLLM.css';
import { useState } from 'react';
import { callOpenAI, callPerplexity} from './apiService';

function RunLLM() {
    const [responses, setResponses] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpenAI = async () => {
        try {
            setError(null);
            const prompt = 'Tell me a joke.';
            const data = await callOpenAI(prompt);
            setResponse(data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setResponse('');
        }
    };
      
    const handlePerplexity = async () => {
        try {
            setError(null);
            setLoading(true);
            const queries = [
                'What is one of the coolest facts about space? Keep this under 3 sentences.',
                'Tell me an interesting fact about constellations. Keep this under 3 sentences.',
                'What is a fascinating discovery about the universe? Keep this under 3 sentences.'
            ];
            
            const responsePromises = queries.map(query => callPerplexity(query));
            const results = await Promise.all(responsePromises);
            
            setResponses(results.map(result => result.content));
        } catch (error) {
            console.error('Perplexity Error Details:', error);
            const errorMessage = error.error || error.message || 'An error occurred.';
            setError(errorMessage);
            setResponses([]);
        } finally {
            setLoading(false);
        }
      };
    
    return (
        <div className="get-started-content">
            <div className="get-started-container">
                <div className="get-started-text">
                    <h1>How does it work?</h1>
                    <p>Classification using CNN and TensorFlow to identify constellations in images</p>
                </div>
            </div>

            <div className="llm-container">
                <h2>Start</h2>
                <div className="llm-button-container">
                    <button 
                        onClick={handlePerplexity} 
                        className="llm-button"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Fun Facts'}
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="cards-container">
                    {responses.map((response, index) => (
                        <div key={index} className="response-card">
                            <div className="card-number">Fact #{index + 1}</div>
                            <div className="card-content">{response}</div>
                        </div>
                    ))}
                </div>                
            </div>
            <p>The project is a part of <a href="https://cutiehack.org/">CutieHack 2024</a></p>
        </div>
    );
}

export default RunLLM;