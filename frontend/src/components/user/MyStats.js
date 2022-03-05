import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyStats = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  let favoritesNumber, watched, totalMin;
  if (currentUser && currentUser.watched) {
    favoritesNumber = currentUser.favorites.length;
    watched = currentUser.watched.length;
    totalMin = currentUser.totalMinutes;
  }

  return (
    <Container className="ms-auto text-center">
      <Row>
        <Col>
          <h4>Total stats</h4>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <i className="bi bi-heart-fill"></i>
          <h5>Favorites:</h5>
          <p>{favoritesNumber}</p>
        </Col>
        <Col md={4}>
          <i className="bi bi-person-video3"></i>
          <h5>Watched:</h5>
          <p>{watched}</p>
        </Col>
        <Col md={4}>
          <i className="bi bi-stopwatch"></i>
          <h5>Seconds:</h5>
          <p>{totalMin}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyStats;
