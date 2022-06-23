import axios from "axios";

export const api = axios.create({
    baseURL:"https://youtube.googleapis.com/youtube/v3/",
})
