import axios from "axios";

const defaultUrl = "http://localhost:8080/api/"

const getData = async (url, token) => {
    try {
        const response = await axios.get(defaultUrl + url, { headers: { Authorization: "Bearer " + token } });
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

const postData = async (url, payload, token) => {
    try {
        const response = await axios.post(defaultUrl + url, payload, { headers: { Authorization: "Bearer " + token } });
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

const deleteData = async (url, token, payload) => {
    try {
        const response = await axios.delete(defaultUrl + url, { headers: { Authorization: "Bearer " + token } }, payload);
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    };
};

const putData = async (url, payload, token) => {
    try {
        const response = await axios.put(defaultUrl + url, payload, { headers: { Authorization: "Bearer " + token } });
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

export { getData, postData, deleteData, putData };