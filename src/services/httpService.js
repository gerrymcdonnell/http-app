import axios from 'axios';

//vid 146 interceptors
axios.interceptors.response.use(null, err => {
    //expected error
    const expectedError = err.response && err.response.status >= 400 && err.response.status < 500

    if (!expectedError) {
        //logging the error somewhere
        console.log('Unexpected error', err);
        alert('unexpected error');
    }
    return Promise.reject(err);
})

//4 methods like axios
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}