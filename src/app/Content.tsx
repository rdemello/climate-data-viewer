import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Content() {
    return (
        <Router>
            <Routes>{/* <Route path="/" element={<Welcome />} /> */}</Routes>
        </Router>
    );
}

export default Content;
