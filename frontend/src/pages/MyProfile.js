import React from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import AccountDetails from "../components/user/AccountDetails";
// import ChangePassword from "../components/user/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container className="w-50 ms-auto my-5">
      <h2 className="mb-2">My Profile</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Account Details</Accordion.Header>
          <Accordion.Body>
            <AccountDetails />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Change Password</Accordion.Header>
          <Accordion.Body>
            {/* <ChangePassword /> */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MyProfile;
