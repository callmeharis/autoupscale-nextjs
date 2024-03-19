import axios from 'axios';

const broadcastAuthInstance = axios.create({
  baseURL: `${process.env.BACKEND_BASE_URL}/broadcasting/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export { broadcastAuthInstance };
