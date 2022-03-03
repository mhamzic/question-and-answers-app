import axios from "axios";

const API_URL = "/api/answers/";

// Create new answer
const createAnswer = async (answerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, answerData, config);

  return response.data;
};

// Get all answers
const getAllAnswers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user answers
const getUserAnswers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "user", config);

  return response.data;
};

// Get user answer
const getAnswer = async (answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + answerId, config);

  return response.data;
};

// Get recent answer
const getRecentAnswers = async (offset, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "recent", offset, config);
  return response.data;
};

// Get hot answer
const getHotAnswers = async (offset, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "hot", offset, config);
  return response.data;
};

// Set like
const setLike = async (answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + answerId + "/like/",
    {},
    config
  );
  return response.data;
};

// Set dislike
const setDislike = async (answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + answerId + "/dislike/",
    {},
    config
  );
  return response.data;
};

// Close answer
const closeAnswer = async (answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + answerId,
    { status: "closed" },
    config
  );

  return response.data;
};

const answerService = {
  createAnswer,
  getAllAnswers,
  getUserAnswers,
  getAnswer,
  closeAnswer,
  getRecentAnswers,
  getHotAnswers,
  setLike,
  setDislike,
};

export default answerService;
