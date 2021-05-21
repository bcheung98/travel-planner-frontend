import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import destinationReducer from './reducers/destinationReducer';

const rootReducer = combineReducers({
    destination: destinationReducer
})

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
)