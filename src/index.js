import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import dummyStore from './dummy-store';


ReactDOM.render(
    <BrowserRouter>
        <App store={dummyStore} />
    </BrowserRouter>, 
    document.getElementById('root')
);
