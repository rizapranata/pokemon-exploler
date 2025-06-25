import axios from "axios";
import { configEnv } from "../config";

const pokemonApi = axios.create({
  baseURL: `${configEnv.api_host}`,
  headers: {
    "Content-Type": "application/json",
  },
});

pokemonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired. Redirect to login...");
    }
    return Promise.reject(error);
  }
);

export default pokemonApi;
