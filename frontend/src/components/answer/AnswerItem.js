import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setLike,
  setLikes,
  setDislikes,
  setDislike,
} from "../../store/answer/answerSlice";

function AnswerItem({ answer, userId }) {
  const dispatch = useDispatch();
  const likeHandler = () => {
    dispatch(setLike(answer.question_id));
    dispatch(setLikes());
  };

  const dislikeHandler = () => {
    dispatch(setDislike(answer.question_id));
    dispatch(setDislikes());
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
                <Button size="sm">Edit</Button>
              </span>
              <span className="text-danger">
                <Button variant="danger" size="sm">
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
