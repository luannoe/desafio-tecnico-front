import axios from 'axios';
import TOKEN from 'consts/strings';

const { REACT_APP_API } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API,
  headers: {
    Accept: 'application/json',
  },
  requestType: 'json',
});

api.interceptors.request.use(
  config => {
    const _config = config;
    if (TOKEN) _config.headers.Authorization = `${TOKEN}`;
    return _config;
  },
  error => Promise.reject(error)
);

const clearData = response => {
  if (!('data' in response) || typeof response.data !== 'object')
    return response;
  if (response.data && !('data' in response.data)) return response.data;
  return response.data.data;
};

api.interceptors.response.use(response => clearData(response));

export default api;
