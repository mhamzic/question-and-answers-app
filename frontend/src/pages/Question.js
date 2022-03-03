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
} from "../store/question/questionSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner/Spinner";
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Ticket() {
  const { question, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.questions
  );
  const { token } = useSelector((state) => state.auth.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const { notes, isLoading: notesIsLoading } = useSelector(
  //   (state) => state.notes
  // );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questionId } = useParams();
  let decoded = jwt_decode(token);
  let userId = decoded.id;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getQuestion(questionId));
    // dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, questionId]);

  // Create answer
  const onAnswerSubmit = (e) => {
    e.preventDefault();
    // dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="container my-4">
        <h3>Something Went Wrong</h3>);
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

  return (
    <div className="container my-5">
      <header>
        <BackButton url="/home" />
        <h3 className="mt-4">Question ID: {question.question_id}</h3>
        <h6>
          Date Submitted: {new Date(question.created_on).toLocaleString()}
        </h6>
        <hr />
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
                    <Button size="sm">Edit</Button>
                  </span>
                  <span className="text-danger">
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h5>Answers</h5>
      </header>

      <Button onClick={openModal} variant="secondary" className="my-2">
        <FaPlus /> Add Answer
      </Button>

      {/* {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))} */}

      {/* {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )} */}
    </div>
  );
}

export default Ticket;
