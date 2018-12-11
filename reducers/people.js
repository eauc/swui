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
  PEOPLE_LOAD_DETAILS,
  PEOPLE_LOAD_PAGE,
} from "../actions/types";

const initialState = {
  nbPages: 1,
  byIds: {},
  byPages: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
  case PEOPLE_LOAD_DETAILS:
    {
      const {details} = action;
      const {url: id} = details;
      return pipe(
        over(lensPath(["byIds", id]), compose(mergeDeepLeft(details), or(__, {}))),
      )(state);
    }
  case PEOPLE_LOAD_PAGE:
    {
      const {count, page, people} = action;
      const idPeoplePairs = map((p) => [p.url, p], people);
      const ids = map(([id]) => id, idPeoplePairs);
      return pipe(
        over(lensProp("byIds"), mergeDeepLeft(fromPairs(idPeoplePairs))),
        over(lensProp("byPages"), assoc(page, ids)),
        assoc("nbPages", Math.ceil(count / 10)),
      )(state);
    }
  default:
    return state;
  }
}
