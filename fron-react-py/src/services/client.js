import axios from "axios";


export const HTTPClient = axios.create({
    baseURL: "http://localhost:8000", 
    headers: {
        "Content-Type": "application/json", 
    },
});