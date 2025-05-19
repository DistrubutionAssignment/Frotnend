import axios from 'axios';

const eventApi = axios.create({
  baseURL: import.meta.env.VITE_EVENT_API_URL,
});

export default eventApi;
