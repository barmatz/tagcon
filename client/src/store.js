import createSagaMiddleware from 'redux-saga'
import { createStore, compose, applyMiddleware  } from 'redux';
import reducers from 'reducers';
import sagas from 'sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
		, sagaMiddleware = createSagaMiddleware()
		, enhancer = composeEnhancers(
				applyMiddleware(sagaMiddleware)
			)
		, store = createStore(reducers, enhancer);

sagaMiddleware.run(sagas);

export default store;
