import {
  __,
  assoc,
  compose,
  fromPairs,
  lensPath,
  lensProp,
  map,
  mergeDeepLeft,
  or,
  over,
  pipe,
} from "ramda";
import {
  VEHICLES_LOAD_DETAILS,
  VEHICLES_LOAD_PAGE,
} from "../actions";

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
  case VEHICLES_LOAD_PAGE:
    {
      const {page, vehicles} = action;
      const idVehiclePairs = map((v) => [v.url, v], vehicles);
      const ids = map(([id]) => id, idVehiclePairs);
      return pipe(
        over(lensProp("byIds"), mergeDeepLeft(fromPairs(idVehiclePairs))),
        over(lensProp("byPages"), assoc(page, ids)),
      )(state);
    }
  default:
    return state;
  }
}
