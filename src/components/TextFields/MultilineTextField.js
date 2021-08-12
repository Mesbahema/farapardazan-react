import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'


export default function MultilineTextField(props) {

  const { state, dispatch } = useContext(DataContext)

  const handleChange = (event) => {

    dispatch({
      type: 'SET_FILTER_BY', payload: event.target.value
    })
    
  };

  return (
        <TextField
          id="standard-select-currency"
          select
          value={state.filterBy}
          onChange={handleChange}
          helperText="عنوان فیلتر را انتخاب کنید"
        >
          {props.inputs.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
  );
}