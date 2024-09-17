import axios from "axios";

export const api = () => axios.create({
    baseURL: "http://10.21.22.254:9000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})