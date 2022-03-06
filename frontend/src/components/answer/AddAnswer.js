import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  createAnswer,
  getAllAnswers,
  reset as resetSlice,
} from "../../store/answer/answerSlice";

const AddAnswer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { answers, isError, isSuccess, message } = useSelector(
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
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.question_id = props.question_id;
      await dispatch(createAnswer(data)).unwrap();
      await dispatch(getAllAnswers(props.question_id)).unwrap();
    } catch (error) {
      toast.info('Error has occurred.');
    }
  };

  // const onSubmit = (data) => {
  //   data.question_id = props.question_id;
  //   dispatch(createAnswer(data)).unwrap();
  //   dispatch(getAllAnswers(props.question_id));
  // };

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
