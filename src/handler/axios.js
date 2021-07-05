import axios from 'axios'

axios.defaults.baseURL = 'http://3.210.82.2:5000/api/v1/'
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = window.location.origin;
axios.defaults.headers.post["Content-Type"] = "application/json";

const api = {
    async get(target) {
        return await axios.get(target).then(response => response).catch(e => {
            throw e.request
        })

    },

    async post(target, payload) {
        return await axios.post(target, payload).then(response => response).catch(e => {
            throw e.request
        })
    },

    async delete(target) {
        return await axios.delete(target).then(response => response).catch(e => {
            throw e.request
        })
    }
}

export default api
