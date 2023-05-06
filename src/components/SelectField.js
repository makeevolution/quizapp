import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from "@mui/system"
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { update } from '../redux/reducer';
import { CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_TYPE } from '../redux/actionsTypes';

const SelectField = (props) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.target.value)  // Call the setter like you would in c#
        switch(props.label){
            case "Category":
               dispatch(update({type: CHANGE_CATEGORY, value: {question_category: e.target.value}}))
               break;
            case "Difficulty":
                dispatch(update({type: CHANGE_DIFFICULTY, value: {question_difficulty: e.target.value}}))
               break;
            case "Type":
                dispatch(update({type: CHANGE_TYPE, value: {question_type: e.target.value}}))
               break;
            default:
                return;
    }
}

    return (
        <Box mt={3} width="100%">
            <FormControl size="small" fullWidth>
                <InputLabel>{props.label}</InputLabel>
                <Select value={value} label={props.label} onChange={handleChange}>
                    {props.options.map((option) =>
                        <MenuItem value={option.name} key={option.id}>{option.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectField