import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.scss';
import './styles/icons.scss';
import "react-datepicker/dist/react-datepicker.css";
import './styles/react-datepicker.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
