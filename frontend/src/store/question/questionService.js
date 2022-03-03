import axios from "axios";

const API_URL = "/api/questions/";

// Create new question
const createQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, questionData, config);

  return response.data;
};

// Get all questions
const getAllQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user questions
const getUserQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "user", config);

  return response.data;
};

// Get user question
const getQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + questionId, config);

  return response.data;
};

// Get recent question
const getRecentQuestions = async (offset, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "recent", offset, config);
  return response.data;
};

// Get hot question
const getHotQuestions = async (offset, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "hot", offset, config);
  return response.data;
};

// Set like
const setLike = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + questionId + "/like/",
    {},
    config
  );
  return response.data;
};

// Set dislike
const setDislike = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_URL + questionId + "/dislike/",
    {},
    config
  );
  return response.data;
};

// Close question
const closeQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + questionId,
    { status: "closed" },
    config
  );

  return response.data;
};

const questionService = {
  createQuestion,
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  closeQuestion,
  getRecentQuestions,
  getHotQuestions,
  setLike,
  setDislike,
};

export default questionService;
