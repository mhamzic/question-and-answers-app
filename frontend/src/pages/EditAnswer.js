import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import {
  getAnswer,
  updateAnswer,
  reset as resetSlice,
  getAllAnswers,
} from "../store/answer/answerSlice";

const EditAnswer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { answerId } = useParams();

  const { answer, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.answers
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAnswer(answerId));
  }, [dispatch, isError, message, answerId]);

  useEffect(() => {
    reset(answer);
  }, [isSuccess, answer, reset]);

  const onSubmit = (data) => {
    let dataForUpdate = { answerId: data.answer_id, text: data.text };
    dispatch(updateAnswer(dataForUpdate));
    dispatch(resetSlice());
    toast.info("Answer updated.");
    navigate(-1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="w-50 my-5">
      <h3>Edit answer</h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
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
    </Container>
  );
};

export default EditAnswer;
