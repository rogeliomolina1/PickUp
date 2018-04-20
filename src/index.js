import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, games} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App games={games}/>, document.getElementById('root'));
registerServiceWorker();
