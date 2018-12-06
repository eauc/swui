import {
  __,
  assoc,
  compose,
  fromPairs,
  lensPath,
  map,
  mergeDeepLeft,
  or,
  over,
  pipe,
} from "ramda";
import { VEHICLES_LOAD_DETAILS } from "../actions";

const initialState = {
  byIds: {},
  byPages: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
  case VEHICLES_LOAD_DETAILS:
    {
      const {details} = action;
      const {url: id} = details;
      return pipe(
        over(lensPath(["byIds", id]), compose(mergeDeepLeft(details), or(__, {}))),
      )(state);
    }
  default:
    return state;
  }
}
