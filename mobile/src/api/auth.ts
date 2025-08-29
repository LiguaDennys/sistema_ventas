import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

export const registerUser = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  return res.data;
};
