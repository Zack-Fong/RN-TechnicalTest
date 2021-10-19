import { createStore, combineReducers } from "redux";

import contactReducer from './contact/contactReducer';

const reducers = {
    contactReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default store;