import axios from "axios";

const API_URL = "/api/users/";

// Get user
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "me", config);
  return response.data;
};

// Get user
const editUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "me", userData, config);
  return response.data;
};

// Change password
const changePassword = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "me/password", userData, config);
  return response.data;
};

const authService = {
  getUser,
  editUser,
  changePassword,
};

export default authService;
