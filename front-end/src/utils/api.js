import axios from 'axios';

const apiLogin = axios.create({
  baseURL: 'http://localhost:3001',
});

export default apiLogin;
