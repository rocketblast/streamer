import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import * as reducers from './reducers'
import * as middlewares from './middlewares'
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import './index.css';

const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(
        ...Object.values(middlewares),
        routerMiddleware(history)
    )
);

// TESTING STUFF
const unsubscribe = store.subscribe(() => console.log(store.getState())); // eslint-disable-line no-unused-vars
/* store.dispatch({
    type: 'ADD_CHANNEL',
    data: {
        id: 'rocketblasttv'
    }
})*/
// unsubscribe();
window.store = store;

import * as channelActions from './actions/channels-actions'; // eslint-disable-line import/first
const actions = window.actions = {
    ...channelActions,
};

store.dispatch(actions.addChannel('monstercat'));
store.dispatch(actions.addChannel('rocketblast'));
store.dispatch(actions.addChannel('wizzlertv'));
store.dispatch(actions.addChannel('kreamylol'));
// NOT TESTING ANYMORE

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
