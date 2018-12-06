import axios from "axios";

export function peopleLoadPage({page}) {
  return axios({
    method: "GET",
    url: "https://swapi.co/api/people",
    params: {
      page,
    },
  });
}
