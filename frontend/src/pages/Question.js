import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuestion,
  setLike,
  setLikes,
  setDislikes,
  setDislike,
  removeQuestion,
  getAllQuestions,
  reset,
} from "../store/question/questionSlice";
import { getAllAnswers } from "../store/answer/answerSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner/Spinner";
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AnswerItem from "../components/answer/AnswerItem";
import AddAnswer from "../components/answer/AddAnswer";

function Question() {
  const { question, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.questions
  );

  const {
    answers,
    isLoading: answerIsLoading,
    isSuccess: answerIsSuccess,
  } = useSelector((state) => state.answers);

  const { token } = useSelector((state) => state.auth.user);
  const [answerFormIsOpen, setAnswerFormIsOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questionId } = useParams();
  let decoded = jwt_decode(token);
  let userId = decoded.id;

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    dispatch(getQuestion(questionId));
    dispatch(getAllAnswers(questionId));
    // eslint-disable-next-line
  }, [isError, message, questionId]);

  // Open/close answer form
  const openAnswerForm = () => setAnswerFormIsOpen(!answerFormIsOpen);

  if (isLoading || answerIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="container my-4">
        <h3>Something Went Wrong</h3>
      </div>
    );
  }

  const likeHandler = () => {
    dispatch(setLike(question.question_id));
    dispatch(setLikes());
  };

  const dislikeHandler = () => {
    dispatch(setDislike(question.question_id));
    dispatch(setDislikes());
  };

  const onDelete = () => {
    dispatch(removeQuestion(questionId));
    dispatch(getAllQuestions());
    toast.info("Question removed successfully.");
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="container my-5">
      <header>
        <BackButton url="/" />
        <h3 className="mt-4">Question ID: {question.question_id}</h3>
        <h6>
          Date Submitted: {new Date(question.created_on).toLocaleString()}
        </h6>
        <hr />
      </header>

      <div className="p-4 mb-4 bg-light">
        <h6>Question by {question.name}</h6>
        <p>{question.text}</p>
        <hr />
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <span className="me-4 text-success">
                <FaThumbsUp
                  onClick={likeHandler}
                  style={{ cursor: "pointer" }}
                />
                ({question.likes})
              </span>
              <span className="me-4 text-danger">
                <FaThumbsDown
                  onClick={dislikeHandler}
                  style={{ cursor: "pointer" }}
                />
                ({question.dislikes})
              </span>
            </div>
            {userId === question.user_id && (
              <div>
                <span className="me-2 text-danger">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/editquestion/${questionId}`)}
                  >
                    Edit
                  </Button>
                </span>
                <span className="text-danger">
                  <Button variant="danger" size="sm" onClick={onDelete}>
                    Delete
                  </Button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h5>Answers</h5>

      <Button onClick={openAnswerForm} variant="secondary" className="my-2">
        {!answerFormIsOpen ? "Add Answer" : "Close"}
      </Button>
      {answerFormIsOpen && <AddAnswer question_id={question.question_id} />}

      {answerIsSuccess &&
        answers.map((answer, i) => (
          <AnswerItem
            key={answer.answer_id}
            answer={answer}
            userId={userId}
            questionId={question.question_id}
          />
        ))}
    </div>
  );
}

export default Question;
