import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeList from "../components/HomeList";

const Home = () => {
  return (
    <Container className="my-5">
      <HomeList />
    </Container>
  );
};

export default Home;
