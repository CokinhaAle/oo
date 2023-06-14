import axios from "axios";

/*

// rodar com IPV4: json-server --watch -d 180 --host 192.168.78.62 db.json

*/

const api = axios.create({
    baseURL: "http://192.168.78.62:3000",
});

export default api;
