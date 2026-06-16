import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
// :white_check_mark: Set base URL globally for axios
//axios.defaults.baseURL = "https://inventorybackend.dockyardsoftware.com/";
//axios.defaults.baseURL = "https://inventorybackend.dockyardsoftware.com/";
axios.defaults.headers.common["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Temporarily disable StrictMode to prevent double API calls in development
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
// If you want to measure performance, pass a function
// or log results (for example: reportWebVitals(console.log))
reportWebVitals();