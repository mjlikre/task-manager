import { combineReducers } from "redux";
import auth from './auth';
import tasks from "./tasks";
import grocery from "./groceries"

export default combineReducers({
  auth,
  tasks,
  grocery
});