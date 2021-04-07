import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'; 
import mainReducer from '../reducers/index';

const reduxLogger = createLogger();
const store = createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware,
        reduxLogger
    )
);

export default store;