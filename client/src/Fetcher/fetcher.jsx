import axios from "axios";

const defaultUrl = "http://localhost:8080/api/"

const getData = async (url, payload) => {
    try {
        const response = await axios.get(defaultUrl + url, payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

async function postData(url, payload) {
    try {
        const response = await axios.post(defaultUrl + url, payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

const deleteData = async (url, payload) => {
    try {
        const response = await axios.delete(defaultUrl + url, payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

const putData = async (url, payload) => {
    try {
        const response = await axios.put(defaultUrl + url, payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    };
};

export { getData, postData, deleteData, putData };