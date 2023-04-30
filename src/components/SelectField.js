import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from "@mui/system"
import React, { useState } from 'react'

const SelectField = (props) => {
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)  // Call the setter like you would in c#
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
    )}

export default SelectField