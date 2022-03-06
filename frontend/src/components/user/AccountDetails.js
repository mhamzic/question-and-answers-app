import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser, getUser, reset } from "../../store/user/userSlice";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUser());
  }, [dispatch, isError, message]);

  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
    }
  }, [isSuccess, currentUser]);

  const onSubmit = async (data) => {
    dispatch(editUser(data));
    if (isSuccess) {
      dispatch(getUser());
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="d-flex align-items-center">
        <Col sm={10}>
          <Form.Group className="mb-3">
            <Form.Label>Change name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", {
                required: "Name is required",
                min: { value: 3, message: "Too short." },
              })}
              isInvalid={errors.name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name && errors.name.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex align-items-center">
        <Col sm={10}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address. Please check your input.",
                },
              })}
              isInvalid={errors.email}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-start">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AccountDetails;
