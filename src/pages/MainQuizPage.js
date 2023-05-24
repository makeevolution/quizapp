import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useAxios, { useTrackerAPI } from "../hooks/useAxios";
import { useEffect, useState, Fragment } from 'react'

const MainQuizPage = () => {
    let trackerAPIurl = `/api/sentence/nl/`
    const { response, error, loading } = useTrackerAPI(trackerAPIurl)
    const [questions, setQuestions] = useState(null)

    const checkIfWordIsAFillable = (question, word, index) => {
        // this function checks if the word is a fillable word by checking if the word and index are in the nLclozesIndices list
        // of the question object 
        return question.nLclozesIndices.some((cloze_word_and_position) => {
            if (cloze_word_and_position.clozeWord === word && cloze_word_and_position.indexInSentence === index) {
                return true;
            };
        });
    };

    const changeWordToHTML = (question, word, index) => {
        const is_word_a_fillable = checkIfWordIsAFillable(question, word, index);
        if (is_word_a_fillable) {
            return (
                <span key={index}>
                    <input type="text" value={word} />
                </span>
            );
        }
        return <span key={index}> {word} </span>;
    };

    // Obtain the list of options for the current option using the useEffect hook
    useEffect(() => {
        if (response?.length) {

            const newLocal = response.map((question) => {
                const words = question.phrase.split(' ');
                const words_as_html_elem = words.map((word, index) => {
                    return changeWordToHTML(question, word, index);
                });
                return <div>{words_as_html_elem}</div>
            });
            const res = newLocal
            setQuestions(res)
        }
    }, [response]);  // This list specifies the dependencies of this hook. A dependency
    // makes the hook called whenever the values of these dependencies change

    return (
        <Box>
            <Typography>{questions}</Typography>
        </Box>
    );
}
export default MainQuizPage;