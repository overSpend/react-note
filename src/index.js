import React from 'react';
import ReactDom from 'react-dom';
import './global.css';
import App from './components/App';
import { unregister } from './serviceWorker';

ReactDom.render(<App />, document.getElementById('root'));
unregister();