import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducerMap } from './reducers';
import thunk from 'redux-thunk';
import { BundleService } from './backend';

import dummyServices from './backend/dummy';
import { selectPassphrase } from './selectors/system-selectors';
import { systemActions } from './reducers/system';

export interface ServiceContext {
    bundleService: BundleService;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const serviceContext: ServiceContext = {
    bundleService: dummyServices.bundleService,
};

const store = createStore(
    combineReducers(reducerMap),
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument(serviceContext))
    )
);

const savedPh = localStorage.getItem('password-manager.ph');
if (savedPh) {
    store.dispatch(systemActions.updatePassphrase(savedPh));
}

// Save ph
store.subscribe(() => {
    const ph = selectPassphrase()(store.getState());
    ph && localStorage.setItem('password-manager.ph', ph);
});

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
