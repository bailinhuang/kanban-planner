import { createStore } from "redux";
import rootReducer from "./reducers/index"; 
import { saveState, loadState } from './persist-store';

let persistedState = loadState()

let store = createStore(rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => { saveState(store.getState()) })

export default store