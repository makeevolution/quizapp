import { useForm, useController, useFieldArray } from "react-hook-form";
import { Typography, Box, Grid } from "@mui/material";
import AddNewQuestion from "../components/AddNewQuestion";
import { useRef } from "react";

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
    const { register, control, handleSubmit, setValue } = useForm(
        {
            defaultValues:  initialValues.current
        }
    ); // take only register and control functions from useForm

    const errors = {};

    const handleSave = (formValues) => {
        //        event.preventDefault();
        //        const errors = validateData();
        //        if (Object.keys(errors).length) {
        //            setErrors(errors);
        //            return;
        //        }
        //        setErrors({});
        console.log("saved");
        //onSave(formValues);  // fake save
    };

    return (
        <Box>
            <Typography variant="h4">Add New Question</Typography>
            <form onSubmit={handleSubmit(handleSave)}>
                <AddNewQuestion control={control} register={register} setValue={setValue} />
                <div style={{ marginTop: "20px" }}>
                    <button type="submit">Save</button>
                </div>
            </form>
        </Box>
    )
}

export default AddNewquestions;