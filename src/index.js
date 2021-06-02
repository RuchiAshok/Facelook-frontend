import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StartPage from './StartPage';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
      <StartPage />
  </BrowserRouter>,
  document.getElementById('root')
);


