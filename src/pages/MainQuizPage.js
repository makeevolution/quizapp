import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useAxios, { useTrackerAPI } from "../hooks/useAxios";
import { useEffect, useState, Fragment, useRef } from 'react'

const MainQuizPage = () => {
    let trackerAPIurl = `/api/sentence/nl/`
    const { response, error, loading } = useTrackerAPI(trackerAPIurl)
    const [questionsRaw, setQuestionsRaw] = useState(null)
    const [questionsAsHtml, setQuestionsAsHtml] = useState(null)
    const questionClozeWords = useRef({})

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const keyOfCaller = event.target.getAttribute("data-key");
        // check if the word in clozeWordStatus with key question.id + "_" + index is equal to the inputValue
        if (questionClozeWords.current[keyOfCaller] === inputValue) {
            event.target.style.color="green"
        }
        else{
            event.target.style.color="red"
        }
    }

    const is_word_a_fillable = (question, word, index) => {
        // this function checks if the word is a fillable word by checking if the word and index are in the nLclozesIndices list
        // of the question object 
        return question.nLclozesIndices.some((cloze_word_and_position) => {
            if (cloze_word_and_position.clozeWord === word && cloze_word_and_position.indexInSentence === index) {
                // make a state for this word
                questionClozeWords.current = ({
                    ...questionClozeWords.current,
                    [question.id + "_" + index]: word
                  });
                return true;
            };
        });
    };

    const changeWordToHtml = (question, word, index) => {
        if (is_word_a_fillable(question, word, index)) {
            return (
                <span key={index}>
                    <input type="text" data-key={question.id + "_" + index} onChange={handleChange} />
                </span>
            );
        }
        return <span key={index}> {word} </span>;
    };

    // Obtain the list of options for the current option using the useEffect hook
    useEffect(() => {
        if (response?.length) {
            setQuestionsRaw(response)

            if (questionsRaw === null) {
                // useState is async, so questionsRaw can still be null even if we have set it in the previous line.
                // This is why we set questionsRaw as a dependency of this hook. This hook will be called again
                // when questionsRaw is finally set by useState.
                return
            }
            setQuestionsAsHtml(questionsRaw.map((question) => {
                const words = question.phrase.split(' ');
                const words_as_html_elem = words.map((word, index) => {
                    return changeWordToHtml(question, word, index);
                });
                return <div>{words_as_html_elem}</div>
            }));
        }
    }, [response, questionsRaw]);  // This list specifies the dependencies of this hook. A dependency
    // makes the hook called whenever the values of these dependencies change

    return (
        <Box>
            <Typography>{questionsAsHtml}</Typography>
        </Box>
    );
}
export default MainQuizPage;