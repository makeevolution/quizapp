import React from 'react'
import { FormControl, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from "react-redux";
import { update } from "../redux/reducer";
import { CHANGE_AMOUNT } from '../redux/actionsTypes';

const TextFieldComp = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(update({type: CHANGE_AMOUNT, value: {amount_of_questions: e.target.value}}
      )
    )
  };

  return (
    <Box mt={3} width="100%">
        <FormControl fullWidth size="small">
            <TextField
                onChange={handleChange}
                variant="outlined"
                label="Amount of Questions"
                type="number"
                size="small"
                />
        </FormControl>
    </Box>
  )
}

export default TextFieldComp