import axios from "axios";

export const api = axios.create({
    baseURL: `http://${window.location.hostname}:4000/api/v1`,
});

export const openApi = axios.create({
    baseURL: `http://openlibrary.org`,
    headers: {
        'User-Agent': "Tomekeeper ndro.lozano@gmail.com"
    }
})
