import axios from 'axios';
import { TOKEN } from '../actions/constants';

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL || 'http://localhost:3001',
  headers: {
    Authorization: typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null,
  },
});

export default customAxios;
