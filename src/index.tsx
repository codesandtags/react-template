import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import './styles/main.scss';

import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store/reducers';
import createMiddleware from './store/middleware/middleware';

declare global {
    interface Window {
        __INITIAL_STATE__: object;
    }
}

const initialState = window.__INITIAL_STATE__ || {};

console.log('El objetivo Window tiene ', window);

delete window.__INITIAL_STATE__;
const store = createStore(
    rootReducer,
    initialState,
    createMiddleware(),
);
const rootElement = document.getElementById('root');


loadableReady(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>,
        rootElement
    );
});

if (module.hot) {
    module.hot.accept();
}