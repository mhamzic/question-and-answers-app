import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { changePassword } from "../../store/user/userSlice";
import { logout, reset } from "../../store/auth/authSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordMain = watch("newpassword", "");

  const onSubmit = async (data) => {
    dispatch(changePassword(data));
    toast.info("Password successfully changed. Please login again.");
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldpassword"
            {...register("oldpassword", {
              required: "Password is required",
              minLength: { value: 6, message: "Password too short." },
            })}
            isInvalid={errors.oldpassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.oldpassword && errors.oldpassword.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newpassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newpassword"
            {...register("newpassword", {
              required: "Password is required",
              minLength: { value: 6, message: "Password too short." },
            })}
            isInvalid={errors.newpassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newpassword && errors.newpassword.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordconf">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordconf"
            {...register("passwordconf", {
              validate: (value) =>
                value === passwordMain || "The passwords do not match",
            })}
            isInvalid={errors.passwordconf}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordconf && errors.passwordconf.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-start">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ChangePassword;
