import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import questionReducer from "./question/questionSlice";
import answerReducer from "./answer/answerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
    // notes: noteReducer,
  },
});
