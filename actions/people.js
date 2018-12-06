import {PEOPLE_LOAD_PAGE} from "./types";
import {peopleLoadPage as apiLoadPage} from "../api";

export function peopleLoadPage({page = 1} = {}) {
  return (dispatch) => {
    return apiLoadPage({page})
      .then(({data: {results}}) => {
        dispatch({type: PEOPLE_LOAD_PAGE, page, people: results});
      });
  };
}
