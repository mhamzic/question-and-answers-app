import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import answerService from "./answerService";

const initialState = {
  answers: [],
  answer: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadMore: true,
  message: "",
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
    reset: (state) => initialState,
    setLikes: (state) => {
      state.answer.likes = state.answer.likes + 1;
    },
    setDislikes: (state) => {
      state.answer.dislikes = state.answer.dislikes + 1;
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

  },
});

export const { reset, setLikes, setDislikes } = answerSlice.actions;
export default answerSlice.reducer;
