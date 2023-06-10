import { useForm, useController, useFieldArray } from "react-hook-form";
import { Typography, Box, Grid } from "@mui/material";
import AddNewQuestion from "../components/AddNewQuestion";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const QuestionSchema = yup.object().shape({
    questions: yup.array().of(
        yup.object().shape({
            phrase: yup.string().required("Phrase is required"),
            translations: yup.array().of(
                    yup.string().required("Translation cannot be empty")
            )
        })
    )
}).required();

const AddNewquestions = () => {
    const initialValues = useRef(
        {
            questions: [{phrase: "",
                        note1: "",
                        note2: "",
                        note3: "",
                        translations: [""]}]
        }
    )
    const { register, control, handleSubmit, setValue,  formState:{ errors } } = useForm(
        {
            defaultValues:  initialValues.current,
            resolver: yupResolver(QuestionSchema)
        }
    ); // take only register and control functions from useForm

    const handleSave = (formValues) => {
        console.log(JSON.stringify(formValues))
    };

    return (
        <Box>
            <Typography variant="h4">Add New Question</Typography>
            <form onSubmit={handleSubmit(handleSave)}>
                <AddNewQuestion control={control} register={register} errors={errors}/>
                <div style={{ marginTop: "20px" }}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </Box>
    )
}

export default AddNewquestions;