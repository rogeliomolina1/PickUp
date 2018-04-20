import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {games} from './CurrentGames';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App games={games}/>, document.getElementById('root'));
registerServiceWorker();
