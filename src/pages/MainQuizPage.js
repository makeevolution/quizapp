import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useAxios, { useTrackerAPI } from "../hooks/useAxios";
import { useEffect, useState, Fragment, useRef } from 'react'
import { useNavigate } from "react-router-dom";

const MainQuizPage = () => {
    let trackerAPIurl = `/api/sentence/nl/`
    const { response, error, loading } = useTrackerAPI(trackerAPIurl)
    const [questionsRaw, setQuestionsRaw] = useState(null)
    const [questionsAsHtml, setQuestionsAsHtml] = useState([])
    const questionClozeWords = useRef({})
    const render_count = useRef(0)
    const amountOfQuestions = useRef(0)
    const [questionIndex, setQuestionIndex] = useState(0) // track which question we are in now
    const navigate = useNavigate();

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const keyOfCaller = event.target.getAttribute("data-key");
        // check if the word in clozeWordStatus with key question.id + "_" + index is equal to the inputValue
        if (questionClozeWords.current[keyOfCaller] === inputValue) {
            event.target.style.color="green"
        }
        else {
            event.target.style.color="red"
        }
    }

    const isWordAFillable = (question, word, index) => {
        // this function checks if the word is a fillable word by checking if the word and index are in the nLclozesIndices list
        // of the question object 
        return question.nLclozesIndices.some((cloze_word_and_position) => {
            if (cloze_word_and_position.clozeWord === word && cloze_word_and_position.indexInSentence === index) {
                // update the clozeWordStatus object with the key question.id + "_" + index and the value word
                questionClozeWords.current = ({
                    ...questionClozeWords.current,
                    [question.id + "_" + index]: word
                  });
                return true;
            };
        });
    };

    const changeWordToHtml = (question, word, index) => {
        if (isWordAFillable(question, word, index)) {
            return (
                <span key={question.id + "_" + index}>
                    <input key={question.id + "_" + index} type="text" data-key={question.id + "_" + index} onChange={handleChange} />
                </span>
            );
        }
        return <span key={question.id + "_" + index} > {word} </span>;
    };

    useEffect(() => {
        if (response?.length) {
            amountOfQuestions.current = response.length
            setQuestionsRaw(response);
        }
      }, [response]);
    
    useEffect(() => {
        if (questionsRaw) {
          setQuestionsAsHtml(
            questionsRaw.map((question) => {
              const words = question.phrase.split(" ");
              const words_as_html_elem = words.map((word, index) => {
                return changeWordToHtml(question, word, index);
              });
              return <div key={question.id}>{words_as_html_elem}</div>;
            })
          );
        }
      }, [questionsRaw]);
    
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
    // the return below will show the question index
    // the question
    const handleClickNext = () => {
        if (questionIndex + 1 < amountOfQuestions.current) {
            setQuestionIndex(questionIndex + 1)
        }
        else{
            navigate("/")
        }
    }

    function Question({}){
        if (questionsAsHtml !==null) {
            return (
                <Typography component={'span'} variant={"body2"}>
                    {questionsAsHtml[questionIndex]}
            </Typography>
            )
        }
    }
    return (
        <Box>
            <Typography variant="h4">
                Question {questionIndex + 1} / {amountOfQuestions.current}
            </Typography>
            <Question />
            <Button variant="contained" onClick={handleClickNext}> Volgende </Button>
        </Box>
    );
}
export default MainQuizPage;
