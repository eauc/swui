import { combineReducers } from "redux";
import people from "./people";
import vehicles from "./vehicles";

export default combineReducers({
  people,
  vehicles,
});
