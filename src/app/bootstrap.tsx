import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/main.scss';

const render_target = document.getElementById('root')!;

ReactDOM.createRoot(render_target).render(<App />);
