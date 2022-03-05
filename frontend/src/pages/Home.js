import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionList from "../components/question/QuestionList";

const Home = () => {
  return (
    <Container className="my-5">
      <QuestionList />
    </Container>
  );
};

export default Home;
