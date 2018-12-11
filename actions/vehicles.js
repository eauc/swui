import {
  VEHICLES_LOAD_DETAILS,
  VEHICLES_LOAD_PAGE,
} from "./types";
import {
  vehiclesLoadDetails as apiLoadDetails,
  vehiclesLoadPage as apiLoadPage,
} from "../api";

export function vehiclesLoadPage({page = 1} = {}) {
  return (dispatch) => {
    return apiLoadPage({page})
      .then(({data: {results}}) => {
        dispatch({type: VEHICLES_LOAD_PAGE, page, vehicles: results});
      });
  };
}

export function vehiclesLoadDetails({id}) {
  return (dispatch) => {
    return apiLoadDetails({id})
      .then(({data: details}) => {
        dispatch({type: VEHICLES_LOAD_DETAILS, details});
      });
  };
}
