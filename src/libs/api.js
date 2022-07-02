import axios from 'axios';

const { API_KEY } = process.env;

const api = axios.create({
  baseURL: 'https://api.clashroyale.com/v1'
});

api.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export { api };
