import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner/Spinner";
import {
  getHotQuestions,
  getRecentQuestions,
  reset,
} from "../store/question/questionSlice";
import QuestionItem from "./question/QuestionItem";
import { Button, Row, Col, Table } from "react-bootstrap";
import { getTopAnswers } from "../store/answer/answerSlice";

const QuestionList = (props) => {
  const { hotQuestions, recentQuestions, isSuccess, isLoading, isLoadMore } =
    useSelector((state) => state.questions);

  const { topAnswers } = useSelector((state) => state.answers);

  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log(isSuccess);
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getRecentQuestions({ offset }));
  }, [dispatch, offset]);

  useEffect(() => {
    dispatch(getHotQuestions());
    dispatch(getTopAnswers());
  }, [dispatch]);

  const loadMore = () => {
    setOffset((prevState) => prevState + 5);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Row>
      <Col sm={12} md={7}>
        <h5 className="my-4">Recent Questions</h5>
        {recentQuestions.map((question) => (
          <QuestionItem key={question.question_id} question={question} />
        ))}
        <div className="d-grid gap-2">
          <Button variant="info" onClick={loadMore} disabled={!isLoadMore}>
            Load More
          </Button>
        </div>
      </Col>
      <Col sm={12} md={5}>
        <div className="m-2 p-2 bg-light">
          <h5 className="my-4">Top 5 Questions</h5>
          {hotQuestions.map((question) => (
            <QuestionItem
              key={question.question_id}
              question={question}
              hot={true}
            />
          ))}
        </div>
        <div>
          <h5 className="my-4">Users With Most Answers</h5>
          <Table striped hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total answers</th>
              </tr>
            </thead>
            <tbody>
              {topAnswers.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <h6>{user.name}</h6>
                  </td>
                  <td>{user.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};

export default QuestionList;
