import { combineReducers } from 'redux';
import { movieListReducer } from './movieListReducer';

const mainReducer = combineReducers({
    movieListReducer
});

export default mainReducer;