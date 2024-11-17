import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-content">
            <div className="home-hero-container">
                <div className="home-hero-text">
                    <h1>Star Searching</h1>
                    <p>Embark on a journey through the cosmos with Space Facts Explorer! Our app brings the wonders of the universe right to your fingertips by presenting random, fascinating space facts sourced from Perplexity. Dive into the mysteries of space with three engaging facts displayed on interactive cards every time you explore.</p>
                    <button 
                        className="home-hero-button" 
                        onClick={() => navigate('/run')}
                    >
                        Get Started
                    </button>
                </div>
            </div>

            <div className="home-about-container">
                <div className="home-features-container">
                    <h2>Features</h2>
                    <p><b>Randomized Facts:</b> Discover new and intriguing space facts each time you use the app.</p>
                    <p><b>Interactive Cards:</b> Enjoy a visually appealing presentation with three informative cards.</p>
                    <p><b>Reliable Sources:</b> All facts are sourced from Perplexity, ensuring accuracy and reliability.</p>
                    <p><b>User-Friendly Interface:</b> Navigate effortlessly through a clean and intuitive design.</p>
                </div>
            </div>
            <p>The project is a part of <a href="https://cutiehack.org/">CutieHack 2024</a></p>
        </div>
    );
}

export default Home;