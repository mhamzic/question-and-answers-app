import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function QuestionItem({ question }) {
  return (
    <>
      <Card className="my-4">
        <div className="">
          <Card.Body>
            <Card.Text>{question.text}</Card.Text>
            <Card.Text></Card.Text>
            <Link
              to={`/question/${question.question_id}`}
              className="btn btn-secondary"
            >
              View
            </Link>
          </Card.Body>
          <Card.Footer as="div" className="d-flex justify-content-between">
            <div>{new Date(question.created_on).toLocaleDateString()}</div>
            <div>
              <span className="me-4 text-success">
                <FaThumbsUp />({question.likes})
              </span>
              <span className="text-danger">
                <FaThumbsDown />({question.dislikes})
              </span>
            </div>
          </Card.Footer>
        </div>
      </Card>
    </>
  );
}

export default QuestionItem;
