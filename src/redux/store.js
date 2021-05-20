import { createStore } from 'redux';
import { combineReducers } from 'redux';
import destinationReducer from './reducers/destinationReducer';

const rootReducer = combineReducers({
    destination: destinationReducer
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)