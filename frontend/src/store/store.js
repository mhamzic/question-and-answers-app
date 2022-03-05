import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import questionReducer from "./question/questionSlice";
import answerReducer from "./answer/answerSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
});
