import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import BackButton from "../components/BackButton";
import {
  createQuestion,
  getRecentQuestions,
  reset as resetSlice,
} from "../store/question/questionSlice";

const AddQuestion = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(resetSlice());
      navigate("/");
    }

    dispatch(resetSlice());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createQuestion(data));
    // dispatch(getRecentQuestions());
    toast.info("Question added.");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="w-50 my-5">
      <h3>Please enter your question</h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Add your question..."
            {...register("text", {
              required: "Question is required.",
            })}
            isInvalid={errors.text}
          />
          <Form.Control.Feedback type="invalid">
            {errors.text && errors.text.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {/* <BackButton url="/home" /> */}
        </div>
      </Form>
    </Container>
  );
};

export default AddQuestion;
