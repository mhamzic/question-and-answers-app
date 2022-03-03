import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
  questions: [],
  hotQuestions: [],
  question: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadMore: true,
  message: "",
};

// Create new question
export const createQuestion = createAsyncThunk(
  "questions/create",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.createQuestion(questionData, token);
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

// Get all questions
export const getAllQuestions = createAsyncThunk(
  "questions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.getAllQuestions(token);
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

// Get all user's questions
export const getUserQuestions = createAsyncThunk(
  "questions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.getQuestions(token);
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

// Get user question
export const getQuestion = createAsyncThunk(
  "questions/getQuestion",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.getQuestion(questionId, token);
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

// Get recent questions
export const getRecentQuestions = createAsyncThunk(
  "questions/getRecentQuestions",
  async (offset, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.getRecentQuestions(offset, token);
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

// Get hot questions
export const getHotQuestions = createAsyncThunk(
  "questions/getHotQuestions",
  async (offset, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.getHotQuestions(offset, token);
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

// Close question
export const closeQuestion = createAsyncThunk(
  "questions/close",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.closeQuestion(questionId, token);
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
  "questions/setLike",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.setLike(questionId, token);
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
  "questions/setLike",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.setDislike(questionId, token);
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

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setLikes: (state) => {
      state.question.likes = state.question.likes + 1;
    },
    setDislikes: (state) => {
      state.question.dislikes = state.question.dislikes + 1;
    },
  },
  extraReducers: {
    [createQuestion.pending]: (state) => {
      state.isLoading = true;
    },
    [createQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [createQuestion.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getAllQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = action.payload;
    },
    [getAllQuestions.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getUserQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.questions = action.payload;
    },
    [getUserQuestions.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getQuestion.pending]: (state) => {
      state.isLoading = true;
    },
    [getQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.question = action.payload;
    },
    [getQuestion.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getRecentQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecentQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload.length < 5) {
        state.isLoadMore = false;
      }
      action.payload.forEach((item) => state.questions.push(item));
    },
    [getRecentQuestions.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [getHotQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [getHotQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload.length < 5) {
        state.isLoadMore = false;
      }
      action.payload.forEach((item) => state.hotQuestions.push(item));
    },
    [getHotQuestions.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, setLikes, setDislikes } = questionSlice.actions;
export default questionSlice.reducer;
