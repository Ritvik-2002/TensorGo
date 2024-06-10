import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
    },
});

Axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default Axios;