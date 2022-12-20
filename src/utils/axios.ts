import axios from "axios";

const api = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_POKEMON_API_URL,
    timeout: 1000,
  });
  return instance;
};

export default api();
