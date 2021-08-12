import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ClearIcon from '@material-ui/icons/Clear';
import MultilineTextField from './MultilineTextField';

import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'



const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchInput(props) {
  const classes = useStyles();

  const { state, dispatch } = useContext(DataContext)

  const {filter, filterBy} = state

  const handleChange = (event) => {
    dispatch({
      type: 'SET_FILTER', payload: event.target.value
    })
  }

  const handleClick = (event) => {
    event.preventDefault()
    dispatch({
      type: 'SET_FILTER', payload: ''
    })
  }

  const disabled = filterBy ? false : true

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="جستجو کنید"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={filter}
        onChange={handleChange}
        disabled={disabled}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleClick}>
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <MultilineTextField inputs={props.inputs}/>
    </Paper>
  );
}