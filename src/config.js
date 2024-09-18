import axios from "axios";

const testniURL = "http://127.0.0.1:8000";
const prodURL = "http://10.21.22.254:9000";

export const api = () =>
  axios.create({
    baseURL: prodURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
