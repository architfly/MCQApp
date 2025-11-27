// import axios from "axios";

// const axiosInstance=axios.create({
//    baseURL:"http://localhost:6000",
//     timeout:6000,
//     headers:{
//         "Content-Type":"application/json",
//         "x-auth-token":localStorage.getItem("token") || "",
//     }
// })

// export default axiosInstance

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mcqserver-2s2i.onrender.com", // ✅ Vite syntax
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Har request se pehle latest token attach hoga
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export default axiosInstance;
