import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapView from './views/Map/Map.view';
import WelcomeView from './views/Welcome/Welcome.view';

function Content() {
    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/map" element={<MapView />} />
                <Route path="/" element={<WelcomeView />} />
            </Routes>
        </Router>
    );
}

export default Content;
