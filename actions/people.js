import {
  forEach,
} from "ramda";
import {
  PEOPLE_LOAD_DETAILS,
  PEOPLE_LOAD_PAGE,
} from "./types";
import {
  peopleLoadPage as apiLoadPage,
  peopleLoadDetails as apiLoadDetails,
} from "../api";

export default (actions) => {
  return {
    peopleLoadPage({page = 1} = {}) {
      return (dispatch) => {
        return apiLoadPage({page})
          .then(({data: {count, results}}) => {
            dispatch({type: PEOPLE_LOAD_PAGE, count, page, people: results});
          });
      };
    },
    peopleLoadDetails({id}) {
      return (dispatch) => {
        return apiLoadDetails({id})
          .then(({data: details}) => {
            dispatch({type: PEOPLE_LOAD_DETAILS, details});
          });
      };
    },
    peopleLoadVehiclesDetails({id}) {
      return (dispatch) => {
        return apiLoadDetails({id})
          .then(({data: {vehicles = []}}) => {
            forEach((id) => {
              dispatch(actions.vehiclesLoadDetails({id}));
            }, vehicles);
          });
      };
    },
  };
}
