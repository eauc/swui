import {VEHICLES_LOAD_DETAILS} from "./types";
import {
  vehiclesLoadDetails as apiLoadDetails,
} from "../api";

export function vehiclesLoadDetails({id}) {
  return (dispatch) => {
    return apiLoadDetails({id})
      .then(({data: details}) => {
        dispatch({type: VEHICLES_LOAD_DETAILS, details});
      });
  };
}
