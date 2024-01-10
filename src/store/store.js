import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import {characterReducer, homeReducer} from "./redusers";

const rootReducer = combineReducers({
    character: characterReducer,
    home: homeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;