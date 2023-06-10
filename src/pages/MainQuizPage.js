import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useAxios, { useTrackerAPIget } from "../hooks/useAxios";
import { useEffect, useState, Fragment, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import TranslateSharpIcon from '@mui/icons-material/TranslateSharp';
import SpeakerNotesSharpIcon from '@mui/icons-material/SpeakerNotesSharp';
import AlertDialogSlide from "../components/PopUp";
import { AnswerContext } from "../contexts/AnswerContext";

const MainQuizPage = () => {
    let trackerAPIurl = `/api/sentence/nl/`
    const { response, error, loading } = useTrackerAPIget(trackerAPIurl)
    const [questionsRaw, setQuestionsRaw] = useState(null)
    const [questionsAsHtml, setQuestionsAsHtml] = useState([])
    const [questionPhrase, toggleQuestionPhrase] = useState(false)
    const [questionNote1, toggleQuestionNote1] = useState(false)
    const [questionNote2, toggleQuestionNote2] = useState(false)
    const [questionNote3, toggleQuestionNote3] = useState(false)
    const questionClozeWords = useRef({})
    const render_count = useRef(0)  // for debugging
    const amountOfQuestions = useRef(0)
    const [questionIndex, setQuestionIndex] = useState(0) // track which question we are in now
    const answerIsCorrect = useRef(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const keyOfCaller = event.target.getAttribute("data-key");
        if (questionClozeWords.current[keyOfCaller].substring(0, inputValue.length) === inputValue) {
            event.target.style.color = "green"
        }
        else {
            event.target.style.color = "red"
        }
        if (questionClozeWords.current[keyOfCaller] === inputValue) {
            answerIsCorrect.current = true
        }
        else {
            answerIsCorrect.current = false
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
    if (error) {
        return (
            <Typography variant="h6" mt={20} color="red">
                Something went wrong! Did you start the backend?
            </Typography>
        )
    }

    function Question({ }) {
        if (questionsAsHtml !== null) {
            return (
                <Typography component={'span'} variant={"body2"}>
                    {questionsAsHtml[questionIndex]}
                </Typography>
            )
        }
    }

    const Help = () => {
        if (questionsAsHtml !== null && questionsAsHtml[questionIndex]) {
            if (questionPhrase == false) {
                toggleQuestionPhrase(true)
            }
            else {
                toggleQuestionPhrase(false)
            }
        }
    }

    const Note = ({ noteState, note }) => {
        if (noteState) {
          return (
            <Box>
              <Typography component={'span'} variant={"body2"}>
                {note}
              </Typography>
            </Box>
          );
        } else {
          return <Typography />;
        }
      };
      
      const handleClickNote = (note, toggleNote) => {
        if (note === false) {
          toggleNote(true);
        } else {
          toggleNote(false);
        }
      };
    const handleNote1 = () => handleClickNote(questionNote1, toggleQuestionNote1);
    const handleNote2 = () => handleClickNote(questionNote2, toggleQuestionNote2);
    const handleNote3 = () => handleClickNote(questionNote3, toggleQuestionNote3);

      const backButtonCallback = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        }
        else {
            navigate("/")
        }
    }

    const forwardButtonCallback = () => {
        if (questionIndex + 1 < amountOfQuestions.current) {
            setQuestionIndex(questionIndex + 1)
        }
        else {
            navigate("/endpage")
        }
    }
    return (
        <Box>
            <Typography variant="h4">
                Vraag {questionIndex + 1} / {amountOfQuestions.current}
            </Typography>
            <Question />
            <Box>
                <TranslateSharpIcon onClick={Help} />
                {questionPhrase ? (
                    questionsRaw[questionIndex].eNtranslations.map((translation) => (
                        <Box key={translation}>
                            <Typography component={'span'} variant={"body2"}>
                                {translation}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography />
                )}

                <SpeakerNotesSharpIcon onClick={handleNote1} />
                <Note noteState={questionNote1} note={questionsRaw[questionIndex].note1}/>

                <SpeakerNotesSharpIcon onClick={handleNote2} />
                <Note noteState={questionNote2} note={questionsRaw[questionIndex].note2}/>

                <SpeakerNotesSharpIcon onClick={handleNote3} />
                <Note noteState={questionNote3} note={questionsRaw[questionIndex].note3}/>
            </Box>
            <AnswerContext.Provider value={{answerIsCorrect}}>
                <AlertDialogSlide backButtonCallback={backButtonCallback} forwardButtonCallback={forwardButtonCallback}/>
            </AnswerContext.Provider>
        </Box>
    );
}
export default MainQuizPage;
