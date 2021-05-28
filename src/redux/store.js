import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import destinationReducer from './reducers/destinationReducer';
import tripReducer from "./reducers/tripReducer";

const rootReducer = combineReducers({
    destination: destinationReducer,
    trip: tripReducer
})

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
)