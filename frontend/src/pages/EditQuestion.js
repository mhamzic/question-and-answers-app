import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import {
  getQuestion,
  reset as resetSlice,
  updateQuestion,
} from "../store/question/questionSlice";

const EditQuestion = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questionId } = useParams();

  const { question, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.questions
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

    dispatch(getQuestion(questionId));
  }, [dispatch, isError, message, questionId]);

  useEffect(() => {
    reset(question);
  }, [isSuccess, question, reset]);

  const onSubmit = (data) => {
    let dataForUpdate = { questionId: data.question_id, text: data.text };
    dispatch(updateQuestion(dataForUpdate));
    dispatch(resetSlice());
    toast.info("Question updated.");
    navigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="w-50 my-5">
      <h3>Edit your question</h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
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

export default EditQuestion;
