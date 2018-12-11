import people from "./people";
import vehicles from "./vehicles";

const actions = {};

Object.assign(
  actions,
  people(actions),
  vehicles(actions),
);

export default actions;
