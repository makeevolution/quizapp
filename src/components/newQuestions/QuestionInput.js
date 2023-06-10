import { Typography, Box, Grid } from "@mui/material";

// Custom reusable component for the question input
export default function QuestionInput ({ errors, questionIndex, question, register }) {
        return (
            <div key={`question_phrase_${questionIndex}`}>
                <Typography variant="h6">Phrase</Typography>
                <input
                    {...register(`questions[${questionIndex}].phrase`)}
                    defaultValue={question.phrase}
                />
                {(errors.questions && errors.questions[questionIndex] && errors.questions[questionIndex].phrase)? <p>{errors.questions[questionIndex].phrase.message}</p> : null}
            </div>
        );
    };
