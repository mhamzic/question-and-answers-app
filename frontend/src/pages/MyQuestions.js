import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import { getUserQuestions, reset } from "../store/question/questionSlice";
import QuestionItem from "../components/question/QuestionItem";
import { Button, Row, Col, Table, Container } from "react-bootstrap";
import BackButton from "../components/BackButton";

const MyQuestions = (props) => {
  const { userQuestions, isSuccess, isLoading, isLoadMore } = useSelector(
    (state) => state.questions
  );

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
    dispatch(getUserQuestions({ offset }));
  }, [dispatch, offset]);

  const loadMore = () => {
    setOffset((prevState) => prevState + 5);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="pb-5 py-4">
      <BackButton url={"/"} />
      <h5 className="my-4">My Questions</h5>
      {userQuestions.map((question) => (
        <QuestionItem key={question.question_id} question={question} />
      ))}
      <div className="d-grid gap-2">
        <Button variant="info" onClick={loadMore} disabled={!isLoadMore}>
          Load More
        </Button>
      </div>
    </Container>
  );
};

export default MyQuestions;
