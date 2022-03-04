import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function AnswerItem({ answer }) {
  return (
    <>
      <Card className="my-4 bg-light">
        <div className="">
          <Card.Header>
            <h6>Answered by {answer.name}</h6>
          </Card.Header>
          <Card.Body>
            <Card.Text>{answer.text}</Card.Text>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer as="div" className="d-flex justify-content-between">
            <div>{new Date(answer.created_on).toLocaleDateString()}</div>
            {/* <div>
              <span className="me-4 text-success">
                <FaThumbsUp />({answer.likes})
              </span>
              <span className="text-danger">
                <FaThumbsDown />({answer.dislikes})
              </span>
            </div> */}
          </Card.Footer>
        </div>
      </Card>
    </>
  );
}

export default AnswerItem;
