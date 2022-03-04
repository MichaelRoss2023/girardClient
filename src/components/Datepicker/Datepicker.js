import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
}));

export default function DatePicker(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={props.id}
        label={props.label}
        type="date"
        defaultValue={props.value}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={props.handleDate}
      />
    </form>
  );
}