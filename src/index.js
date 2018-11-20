import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { registerServiceWorker } from "./register-service-worker";
import ReactWebComponent from 'react-web-component';


ReactWebComponent.create(<App />, 'aeon-chat', { style: './index.css' });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();