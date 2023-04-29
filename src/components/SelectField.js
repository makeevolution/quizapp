import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from "@mui/system"
import React, { useState } from 'react'

const SelectField = (props) => {
    const {label} = props;
    const [value, setValue] = useState('')

    const handleChange = () => {}

    return (
        <Box mt={3} width="100%">
            <FormControl>
                <InputLabel>{label}</InputLabel>
                <Select value={value} label={label} onChange={handleChange}>
                    <MenuItem>Options1</MenuItem>
                    <MenuItem>Options2</MenuItem>
                    <MenuItem>Options3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )}

export default SelectField