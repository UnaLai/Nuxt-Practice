import axios from "axios";
import store from "../store/index";

const apiClient = axios.create({
  baseURL: location.href.includes("erp.chuen.com.tw")
    ? `https://erp.chuen.com.tw/api/`
    : `https://erp-stage.chuen.com.tw/api/`,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use(function(config) {
  config.headers["Authorization"] = store.getters.getToken;
  return config;
});

apiClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return error.response;
  }
);

const sequelizeError = {
  "unique violation": "資料重複"
};

const responseHandler = {
  "200": res => res.data,
  "400": res => {
    let message = "";
    if (typeof res.data === "object") {
      message = res.data.error.errors
        .map(error => {
          return {
            ...error,
            message: error.value + " " + sequelizeError[error.type]
          };
        })
        .shift();
    } else if (typeof res.data === "string") {
      message = res.data.substring(4, res.data.indexOf("</h1>"));
    }
    return Promise.reject(message);
  },
  "401": res => {
    store.dispatch("logout");
    return Promise.reject(res);
  },
  "404": () => Promise.reject("找不到頁面，請重新確認"),
  "500": () => Promise.reject("伺服器錯誤")
};

export default {
  async GET(path, data = "") {
    let query = new URLSearchParams(data).toString();
    query = query.length ? `?${query}` : query;
    const response = await apiClient.get(path + query);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async POST(path, data) {
    const response = await apiClient.post(path, data);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async PUT(path, data) {
    const response = await apiClient.put(path, data);
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  },
  async DELETE(path, data) {
    const response = await apiClient.delete(path, { data: data });
    if (response.status in responseHandler)
      return responseHandler[response.status](response);
    else return response.data;
  }
};
