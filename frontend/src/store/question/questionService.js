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

// Update question
const updateQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + questionData.questionId,
    questionData.text,
    config
  );
  return response.data;
};

// Get all questions
const getAllQuestions = async (offset, token) => {
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

// Remove user question
const removeQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + questionId, config);
  return response.data;
};

// Get recent question
const getRecentQuestions = async (offset) => {
  const response = await axios.post(API_URL + "recent", offset);
  return response.data;
};

// Get hot question
const getHotQuestions = async () => {
  const response = await axios.get(API_URL + "hot");
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

const questionService = {
  createQuestion,
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  removeQuestion,
  getRecentQuestions,
  getHotQuestions,
  setLike,
  setDislike,
};

export default questionService;
