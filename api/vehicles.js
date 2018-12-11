import axios from "axios";

export function vehiclesLoadPage({page}) {
  return axios({
    method: "GET",
    url: "https://swapi.co/api/vehicles",
    params: {
      page,
    },
  });
}

export function vehiclesLoadDetails({id}) {
  return axios({
    method: "GET",
    url: id,
  });
}
