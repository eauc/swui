import {
  forEach,
} from "ramda";
import {PEOPLE_LOAD_PAGE} from "./types";
import {
  peopleLoadPage as apiLoadPage,
  peopleLoadDetails as apiLoadDetails,
} from "../api";
import {
  vehiclesLoadDetails,
} from "./vehicles";

export function peopleLoadPage({page = 1} = {}) {
  return (dispatch) => {
    return apiLoadPage({page})
      .then(({data: {results}}) => {
        dispatch({type: PEOPLE_LOAD_PAGE, page, people: results});
      });
  };
}

export function peopleLoadVehiclesDetails({id}) {
  return (dispatch) => {
    return apiLoadDetails({id})
      .then(({data: {vehicles = []}}) => {
        forEach((id) => {
          dispatch(vehiclesLoadDetails({id}));
        }, vehicles);
      });
  };
}
