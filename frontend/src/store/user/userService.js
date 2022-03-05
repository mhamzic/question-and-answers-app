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



const authService = {
  getUser,
};

export default authService;
