import {
  forEach,
} from "ramda";
import {
  VEHICLES_LOAD_DETAILS,
  VEHICLES_LOAD_PAGE,
} from "./types";
import {
  vehiclesLoadDetails as apiLoadDetails,
  vehiclesLoadPage as apiLoadPage,
} from "../api";

export default (actions) => {
  return {
    vehiclesLoadPage({page = 1} = {}) {
      return (dispatch) => {
        return apiLoadPage({page})
          .then(({data: {results}}) => {
            dispatch({type: VEHICLES_LOAD_PAGE, page, vehicles: results});
          });
      };
    },
    vehiclesLoadDetails({id}) {
      return (dispatch) => {
        return apiLoadDetails({id})
          .then(({data: details}) => {
            dispatch({type: VEHICLES_LOAD_DETAILS, details});
          });
      };
    },
    vehiclesLoadPilotsDetails({id}) {
      return (dispatch) => {
        return apiLoadDetails({id})
          .then(({data: {pilots = []}}) => {
            forEach((id) => {
              dispatch(actions.peopleLoadDetails({id}));
            }, pilots);
          });
      };
    },
  };
}
