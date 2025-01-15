import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
if (!root) throw new Error('Failed to find the root element');

const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();