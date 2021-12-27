import axios from "axios";
const config = {
  apiUrl: "http://localhost:5000/api/v1",
};

const instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default instance;
