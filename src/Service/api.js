import axios from "axios";
export function getAllShows() {
  return axios.get("http://api.tvmaze.com/shows");
}
export function searchShows(query) {
  return axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
}
export function getShowDetails(id) {
  return axios.get(`http://api.tvmaze.com/shows/${id}?embed=cast`);
}
export function getShowSeason(id) {
  return axios.get(`http://api.tvmaze.com/shows/${id}/seasons`);
}

