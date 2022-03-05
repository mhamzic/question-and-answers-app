import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

import {
  createAnswer,
  getAllAnswers,
  reset as resetSlice,
} from "../../store/answer/answerSlice";

const AddAnswer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.answers
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isSuccess, navigate, message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.question_id = props.question_id;
    dispatch(resetSlice());
    dispatch(createAnswer(data));
    dispatch(getAllAnswers(props.question_id));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Add your answer..."
            {...register("text", {
              required: "Answer is required.",
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
    </>
  );
};

export default AddAnswer;
