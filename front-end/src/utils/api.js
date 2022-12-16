import axios from 'axios';

const apiLogin = axios.create({
  baseURL: 'http://localhost:3006',
});

export default apiLogin;
