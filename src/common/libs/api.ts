import axios from "axios";

export const api = axios.create({
  baseURL: `http://${window.location.hostname}:4000/api/v1`,
});
