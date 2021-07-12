import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const client = axios.create({
    baseURL
});

const catchError = (errorType) => (err) => {
    if (err.response && err.response.data && err.response.data.msg) {
        throw new errorType(err.response.data.msg);
    }
    throw new errorType('Something went wrong... please contact vendor');
};

export {
    client,
    catchError,
}

