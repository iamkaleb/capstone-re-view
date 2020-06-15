import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import Review from './components/Review'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Review />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
