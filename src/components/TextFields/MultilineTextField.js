import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextField(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('EUR');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
        <TextField
          id="standard-select-currency"
          select
          value={value}
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