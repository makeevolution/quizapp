import { GroupAdd } from "@mui/icons-material";
import { Typography, Box, Grid } from "@mui/material";
import { useForm, useController, useFieldArray } from "react-hook-form";


export default function AddNewQuestion({ control, register, setValue }) {

    // Second useFieldArray instance
    const { fields: questions, replace: questionreplace, append: questionappend, remove: questionremove, update: questionupdate } = useFieldArray({
        control,
        name: 'questions',
    });

    const handleRemoveTranslation = (questionIndex, translationIndex) => {
        if (questions[questionIndex].translations.length <= 1) {
            return
        }
        questions[questionIndex].translations = questions[questionIndex].translations.filter((translation, index) => index !== translationIndex)
        questionreplace(questions);
    }

    const handleAddTranslation = (questionIndex) => {
        // We seem to directly mutate the state here, but we are not since here questions' scope is 
        // changed to be limited to this function by react. If we do not call questionreplace, then
        // the state will not be updated and the component will not be re-rendered.
        const current_question = questions[questionIndex]
        current_question.translations.push("")
        questionupdate(current_question)
    }

    const handleAddMoreQuestions = () => {
        questionappend({
            phrase: "", translations: [""]
        })
    }

    const handleDeleteQuestions = (index) => {
        if (questions.length <= 1) {
            return
        }
        questionremove(index)
    }

    // Custom reusable component for the question input
    const QuestionInput = ({ questionIndex, question, register }) => {
        return (
            <div key={`question_phrase_${questionIndex}`}>
                <Typography variant="h6">Phrase</Typography>
                <input
                    {...register(`questions[${questionIndex}].phrase`)}
                    defaultValue={question.phrase}
                />
            </div>
        );
    };

    // Custom reusable component for the translation input
    const TranslationInput = ({ questionIndex, translationIndex, translation, register, handleRemoveTranslation }) => {
        return (
            <div key={`${questionIndex}_${translationIndex}`}>
                <input
                    {...register(`questions[${questionIndex}].translations[${translationIndex}]`)}
                    defaultValue={translation}
                />
                <button type="button" onClick={() => handleRemoveTranslation(questionIndex, translationIndex)}>
                    Remove
                </button>
            </div>
        );
    };

    return (
        <Grid container spacing={2} marginTop={5} direction="column">
            {questions.map((question, questionIndex) => (
                <Grid
                    container
                    direction="column"
                    key={question.id}
                    sx={{ border: '1px solid black', borderRadius: 4, padding: 1 }}
                >
                    <Typography variant="h6">New Question {questionIndex + 1}</Typography>
                    <QuestionInput questionIndex={questionIndex} question={question} register={register} />

                    <Grid item xs>
                        <Typography variant="h6">Translations</Typography>
                        {question.translations.map((translation, translationIndex) => (
                            <TranslationInput
                                key={`${questionIndex}_${translationIndex}`}
                                questionIndex={questionIndex}
                                translationIndex={translationIndex}
                                translation={translation}
                                register={register}
                                handleRemoveTranslation={handleRemoveTranslation}
                            />
                        ))}
                        <button type="button" onClick={() => handleAddTranslation(questionIndex)}>
                            Add a translation
                        </button>
                    </Grid>

                    <Grid item xs>
                        <button type="button" onClick={handleAddMoreQuestions}>
                            Add More Questions
                        </button>
                        <button type="button" onClick={() => handleDeleteQuestions(questionIndex)}>
                            Delete question
                        </button>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}