import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionRecentList from "../components/question/QuestionRecentList";
import QuestionHotList from "../components/question/QuestionHotList";

const Home = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col sm={12} md={6} lg={4}>
          <QuestionRecentList/>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <QuestionHotList/>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
