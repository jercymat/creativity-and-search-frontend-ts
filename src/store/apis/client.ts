import axios from "axios";
import config from "../../config";

const axiosClient = axios.create({
  baseURL: config.api.HOST,
  withCredentials: true,
});

export default axiosClient;