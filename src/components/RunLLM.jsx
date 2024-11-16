import '../css/RunLLM.css';

function RunLLM() {
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
                <p>The project is a part of <a href="https://cutiehack.org/">CutieHack 2024</a></p>
                <div className="llm-button-container">
                    <button className="llm-button">Generate Sky</button>
                </div>
            </div>
        </div>
    );
}

export default RunLLM;