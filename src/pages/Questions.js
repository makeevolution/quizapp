import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CHANGE_SCORE } from "../redux/actionsTypes";
import { update } from '../redux/reducer';
import { useNavigate } from "react-router-dom";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const Questions = () => {
  // State related things
  const{
    question_category,
    question_difficulty,
    question_type,
    amount_of_questions,
    score
  } = useSelector((state) => state.question.value); // global state managed by redux
  const [questionIndex, setQuestionIndex] = useState(0) // track which question we are in now
  const [options, setOptions] = useState([]);  // the options for the current question
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Axios related things.
  // The apiUrl will be requested just before the return of this component
  let apiUrl = `/api.php?amount=${amount_of_questions}`;
  const { response, error, loading } = useAxios({ url: apiUrl})

  if (question_category){
    apiUrl = apiUrl.concat(`&category=${question_category}`)
  }
  if (question_difficulty){
    apiUrl = apiUrl.concat(`&difficult=${question_difficulty}`)
  }
  if (question_type){
    apiUrl = apiUrl.concat(`&type=${question_type}`)
  }
  
  // Obtain the list of options for the current option using the useEffect hook
  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = question.incorrect_answers
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      ) // this function puts the correct answer at the index returned by the getRandomInt function
      setOptions(answers)
    }
  }, [response, questionIndex]);  // This list specifies the dependencies of this hook. A dependency
                                  // makes the hook called whenever the values of these dependencies change

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }
  if(error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong
      </Typography>
    )
  }
  
  const handleClickAnswer = (e) => {
    if (questionIndex < amount_of_questions - 1) {
      setQuestionIndex(questionIndex + 1)
    }
    else {
      navigate("/finalscreen")
    }
    if (e.target.textContent.trim() === response.results[questionIndex].correct_answer.trim()){
      dispatch(update({type: CHANGE_SCORE, value: {score: score + 1}}))
    }
  }

  return (
    <Box>
      <Typography variant="h4">
        Question {questionIndex} / {amount_of_questions}
      </Typography>
      <Typography mt={5}>
        {response.results[questionIndex].question}
      </Typography>
      <Box mt={2}>
        {options.map((option, id) => 
          <Box mt={2} key={id}> 
            <Button variant="contained" onClick={handleClickAnswer}> { option } </Button>
          </Box>)}
        <Box mt={5}>
           Score {score} / {amount_of_questions}
        </Box>
      </Box>
    </Box>
  );
}

export default Questions