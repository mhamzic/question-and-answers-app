import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getHotQuestions, reset } from "../../store/question/questionSlice";
import QuestionItem from "./QuestionItem";
import { Button } from "react-bootstrap";

const QuestionHotList = (props) => {
  const { hotQuestions, isSuccess, isLoading, isLoadMore } = useSelector(
    (state) => state.questions
  );

  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        console.log(isSuccess)
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  //   useEffect(() => {
  //     dispatch(getRecentQuestions({ offset }));
  //   }, []);

  useEffect(() => {
    dispatch(getHotQuestions({ offset }));
  }, [dispatch, offset]);

  const loadMore = () => {
    setOffset((prevState) => prevState + 5);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="my-4">Hot Questions</h1>
      {hotQuestions.map((question) => (
        <QuestionItem key={question.question_id} question={question} />
      ))}
      <div className="d-grid gap-2">
        <Button variant="info" onClick={loadMore} disabled={!isLoadMore}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default QuestionHotList;
