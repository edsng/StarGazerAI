import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RunLLM from './components/RunLLM';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/run" element={<RunLLM />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;