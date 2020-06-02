import createSagaMiddleware from 'redux-saga'
import { createStore, compose, applyMiddleware  } from 'redux';
import reducers from 'reducers';
import sagas from 'sagas';
import { appInit } from 'actions/app'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
		, sagaMiddleware = createSagaMiddleware()
		, enhancer = composeEnhancers(
				applyMiddleware(sagaMiddleware)
			)
		, store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);
store.dispatch(appInit());

export default store;
