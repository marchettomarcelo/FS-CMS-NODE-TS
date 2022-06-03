import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import "./tailwind.output.css"
import App from './App';


document.documentElement.setAttribute('data-color-mode', 'light')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

