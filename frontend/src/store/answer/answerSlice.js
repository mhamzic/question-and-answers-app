import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import answerService from "./answerService";

const initialState = {
  answers: [],
  topAnswers: [],
  answer: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  likes: 0,
  dislikes: 0,
};

// Create new answer
export const createAnswer = createAsyncThunk(
  "answers/create",
  async (answerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.createAnswer(answerData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all answers
export const getAllAnswers = createAsyncThunk(
  "answers/getAnswers",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getAllAnswers(questionId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get users with most answers
export const getTopAnswers = createAsyncThunk(
  "answers/getTopAnswers",
  async (_, thunkAPI) => {
    try {
      return await answerService.getTopAnswers();
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get answer
export const getAnswer = createAsyncThunk(
  "answers/getAnswer",
  async (answerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getAnswer(answerId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update answer
export const updateAnswer = createAsyncThunk(
  "answers/updateAnswer",
  async (dataForUpdate, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.updateAnswer(dataForUpdate, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove answer
export const removeAnswer = createAsyncThunk(
  "questions/removeAnswer",
  async (answerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.removeAnswer(answerId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set like
export const setLike = createAsyncThunk(
  "answers/setLike",
  async (answerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.setLike(answerId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set dislike
export const setDislike = createAsyncThunk(
  "answers/setLike",
  async (answerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.setDislike(answerId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setLikes: (state, action) => {
      let index = state.answers.findIndex(
        (answer) => answer.answer_id === action.payload
      );
      state.answers[index].likes = state.answers[index].likes + 1;
    },
    setDislikes: (state, action) => {
      let index = state.answers.findIndex(
        (answer) => answer.answer_id === action.payload
      );
      state.answers[index].dislikes = state.answers[index].dislikes + 1;
    },
    addToAnswers: (state, action) => {
      state.answers.push(action.payload);
    },
  },
  extraReducers: {
    [createAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [createAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [createAnswer.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getAllAnswers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.answers = action.payload;
    },
    [getAllAnswers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [getAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.answer = action.payload;
    },
    [getAnswer.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getTopAnswers.pending]: (state) => {
      state.isLoading = true;
    },
    [getTopAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.topAnswers = action.payload;
    },
    [getTopAnswers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, setLikes, setDislikes, addToAnswers } = answerSlice.actions;
export default answerSlice.reducer;
