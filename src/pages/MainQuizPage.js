import { Box, Typography, Button, CircularProgress } from "@mui/material";
import useAxios, { useTrackerAPI } from "../hooks/useAxios";
import { useEffect, useState } from 'react'

const MainQuizPage = () => {
    let trackerAPIurl = `/api/Sentence/nl/`
    const { response, error, loading } = useTrackerAPI(trackerAPIurl)
    const [questions, setQuestions] = useState(null)
    // Obtain the list of options for the current option using the useEffect hook
    useEffect(() => {
        if (response?.length) {
            setQuestions(response)
        }
    }, [response, questions]);  // This list specifies the dependencies of this hook. A dependency
    // makes the hook called whenever the values of these dependencies change

    return (
        <Box>
            <Typography>{questions?.map((item) => { return <h1>{item.phrase}</h1> })}</Typography>
        </Box>
    );
}
export default MainQuizPage;