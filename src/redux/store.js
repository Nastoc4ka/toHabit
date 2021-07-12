import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './reducers/rootReducer';
import sagaWatcher from '../saga';


const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagaWatcher);

export default store