import axios from "axios";

export function vehiclesLoadDetails({id}) {
  return axios({
    method: "GET",
    url: id,
  });
}
