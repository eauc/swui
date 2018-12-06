import {
  assoc,
  fromPairs,
  lensProp,
  map,
  mergeDeepLeft,
  over,
  pipe,
} from "ramda";
import { PEOPLE_LOAD_PAGE } from "../actions";

const initialState = {
  byIds: {},
  byPages: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
  case PEOPLE_LOAD_PAGE:
    {
      const {page, people} = action;
      const idPeoplePairs = map((p) => [p.url, p], people);
      const ids = map(([id]) => id, idPeoplePairs);
      return pipe(
        over(lensProp("byIds"), mergeDeepLeft(fromPairs(idPeoplePairs))),
        over(lensProp("byPages"), assoc(page, ids)),
      )(state);
    }
  default:
    return state;
  }
}
