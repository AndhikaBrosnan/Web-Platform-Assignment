import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import animeReducer from "./reducers/animeReducer";

const reducer = combineReducers({
  anime: animeReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
