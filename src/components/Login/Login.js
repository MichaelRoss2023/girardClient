
import './Login.css';
import Card from '../Card/Card.js';
import Button from '@material-ui/core/Button'
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Error from '../Error/Error';


//Taken from Signup.js
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Login(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [formVal, setFormValue] = React.useState({
        email: '',
        password: '',
    });
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }


    //Value change script from signup used to update name and
    const handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;

        setFormValue({
            ...formVal,
            [field]: value
        });
    }

    //Will need to be changed to talk to backend
    const handleSubmit = (event) => {
        // event.preventDefault();
        console.log('Logged In', formVal); //BACKEND
        //sessionStorage.setItem("email",formVal[email]);
        //location.reload();
        //NEED TO VALIDATE
        //ROLE BASED ACCESS
    }

    return (
        <div className="login-form col-flex card">
            <div className="form-content col-flex flex-grow">
                <div className="heading">Log In</div>
                <div className={classes.root}>
                    <form onSubmit={handleSubmit} className="col-flex flex-grow">
                            <div>
                                <Input className="input-field" type="email" name="email" value={formVal.email} onChange={handleChange} placeholder="Email"/>
                            </div>
                            <div>
                                <Input className="input-field" type="password" name="password" value={formVal.password} onChange={handleChange} placeholder="Password"/>
                            </div>
                            <div className="filler"></div>
                        <div className="filler"></div>
                        <div>
                            {value === 0 && <Button color="primary" variant="contained" onClick={()=>setValue(1)} className="button">Log In</Button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;