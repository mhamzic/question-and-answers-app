import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import questionReducer from "./question/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    // notes: noteReducer,
  },
});
