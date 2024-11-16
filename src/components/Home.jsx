import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-content">
            <div className="home-hero-container">
                <div className="home-hero-text">
                    <h1>Star Searching</h1>
                    <p>Classification using CNN and TensorFlow to identify constellations in images</p>
                    <button 
                        className="home-hero-button" 
                        onClick={() => navigate('/run')}
                    >
                        Get Started
                    </button>
                    <p>CutieHack 2024</p>
                </div>
            </div>

            <div className="home-about-container">
                <h2>About</h2>
                <p>Star Searching is a project that uses CNN and TensorFlow to classify constellations in images.</p>
                <p>The project is a part of <a href="https://cutiehack.org/">CutieHack 2024</a></p>
            </div>
        </div>
    );
}

export default Home;