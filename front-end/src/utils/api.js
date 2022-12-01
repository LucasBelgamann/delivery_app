import axios from 'axios';

const api = 'http://localhost:3001/login';

export default async function apiLogin({ email, password }) {
  const { data } = await axios.post(api, { email, password });
  return data;
}
