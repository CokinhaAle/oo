import axios from "axios";

/*

// rodar com IPV4: json-server --watch -d 180 --host 172.30.1.233 db.json

*/

const api = axios.create({
    baseURL: "http://172.30.1.233:3000",
});

export default api;
