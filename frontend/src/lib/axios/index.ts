import axios from "axios";
import { getToken } from "../../utils/getToken";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})