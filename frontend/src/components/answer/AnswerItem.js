import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setLike,
  setLikes,
  setDislikes,
  setDislike,
  getAllAnswers,
  removeAnswer,
  reset,
} from "../../store/answer/answerSlice";
import { useNavigate } from "react-router-dom";

function AnswerItem({ answer, userId, questionId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likeHandler = () => {
    dispatch(setLike(answer.answer_id));
    dispatch(setLikes(answer.answer_id));
  };

  const dislikeHandler = () => {
    dispatch(setDislike(answer.answer_id));
    dispatch(setDislikes(answer.answer_id));
  };

  const onDelete = () => {
    dispatch(removeAnswer(answer.answer_id));
    dispatch(getAllAnswers(questionId));
    toast.info("Answer removed successfully.");
    // dispatch(reset());
  };

  return (
    <>
      <Card className="my-4 bg-light">
        <Card.Header>
          <span>Answered by {answer.name} on </span>
          <span>{new Date(answer.created_on).toLocaleDateString()}</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>{answer.text}</Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer as="div" className="d-flex justify-content-between">
          <div>
            <span className="me-4 text-success">
              <FaThumbsUp onClick={likeHandler} style={{ cursor: "pointer" }} />
              ({answer.likes})
            </span>
            <span className="me-4 text-danger">
              <FaThumbsDown
                onClick={dislikeHandler}
                style={{ cursor: "pointer" }}
              />
              ({answer.dislikes})
            </span>
          </div>
          {userId === answer.user_id && (
            <div>
              <span className="me-2 text-danger">
                <Button
                  size="sm"
                  onClick={() => {
                    navigate(`/editanswer/${answer.answer_id}`);
                  }}
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
        </Card.Footer>
      </Card>
    </>
  );
}

export default AnswerItem;
