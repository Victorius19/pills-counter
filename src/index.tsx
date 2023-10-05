import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
