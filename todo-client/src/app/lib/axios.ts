// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3001", 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor to attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

