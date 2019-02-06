import { combineReducers } from "redux";
import board from "./board.reducer";
// import login from './login.reducer'

export default combineReducers({
  board: board
  // login: login
});
