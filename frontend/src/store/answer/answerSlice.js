import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import answerService from "./answerService";

const initialState = {
  answers: [],
  hotAnswers: [],
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
  "answers/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getAllAnswers(token);
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

// Get all user's answers
export const getUserAnswers = createAsyncThunk(
  "answers/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getAnswers(token);
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

// Get user answer
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

// Get recent answers
export const getRecentAnswers = createAsyncThunk(
  "answers/getRecentAnswers",
  async (offset, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getRecentAnswers(offset, token);
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

// Get hot answers
export const getHotAnswers = createAsyncThunk(
  "answers/getHotAnswers",
  async (offset, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.getHotAnswers(offset, token);
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

// Close answer
export const closeAnswer = createAsyncThunk(
  "answers/close",
  async (answerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.closeAnswer(answerId, token);
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

    [getUserAnswers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.answers = action.payload;
    },
    [getUserAnswers.rejected]: (state, action) => {
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

    [getRecentAnswers.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecentAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload.length < 5) {
        state.isLoadMore = false;
      }
      action.payload.forEach((item) => state.answers.push(item));
    },
    [getRecentAnswers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getHotAnswers.pending]: (state) => {
      state.isLoading = true;
    },
    [getHotAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload.length < 5) {
        state.isLoadMore = false;
      }
      action.payload.forEach((item) => state.hotAnswers.push(item));
    },
    [getHotAnswers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, setLikes, setDislikes } = answerSlice.actions;
export default answerSlice.reducer;
