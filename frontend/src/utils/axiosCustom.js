import axios from "axios";

const axiosCustom = axios.create({
  baseURL: `http://localhost:5001`,
});

// custom response
axiosCustom.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosCustom;
