import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { loginUser, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import Spinner from "../components/Spinner/Spinner";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="w-50 my-5">
      <h3>
        <FaSignInAlt /> User login
      </h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address. Please check your input.",
              },
            })}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required.",
              minLength: { value: 6, message: "Password too short." },
            })}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <p className="text-muted">
            No account? <Link to="/register">Register</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
