
import './Signup.css';
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
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Signup(props) {

    const { user, isAuthenticated, isLoading } = useAuth0();
    let history = useHistory();

    axios.get('/users', { params: { email: user.email } } )
    .then(res => {
        if (res.data != null)
        {
            history.push("/volunteer");
        }
    })
    .catch(err => console.log(err.data));


    



    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [formVal, setFormValue] = React.useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: user.email,
        age: '',
        height: '',
        horseExperience: false,
        horseExpYrs: '',
        riding: false,
        tacking: false,
        grooming: false,
        leading: false
    });
    
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChange = (event) => {
        let field = event.target.name;
        let value = ((event) => {
            switch(event.target.type) {
                case 'checkbox': 
                    return event.target.checked;
                default: 
                    return event.target.value;
            }
        })(event);

        setFormValue({
            ...formVal,
            [field]: value
        });
    }

    const handleSubmit = (event) => {

        /* This code hasn't been tested yet, but I believe this should be the right way to send a HTTP Post
        const Http = new XMLHttpRequest();
        const url = 'https://girard-server.herokuapp.com/'; // Does this need something extra to send to a specific router? .com/positions? 
        Http.open("POST", url);
        Http.send(formVal);
        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
        }
        */
        // event.preventDefault();
        axios.post('/users', formVal)
        .then(res => console.log('User Signed Up'))
        .catch(err => console.log(err.data))
    }

    return (
        <div className="signup-form col-flex card">
            <div className="form-content col-flex flex-grow">
                <div className="heading">Sign Up</div>
                <div className={classes.root}>
                        <Tabs value={value} onChange={handleTabChange} indicatorColor="primary" centered>
                            <Tab label="Basic Details" {...a11yProps(0)} />
                            <Tab label="Skills" {...a11yProps(1)} />
                        </Tabs>

                    <form onSubmit={handleSubmit} className="col-flex flex-grow">
                        <TabPanel value={value} index={0} className="panel">
                            <div className="name-field">
                                <div className="flex-grow" style={{width: '45%'}}>
                                    <Input className="input-field" type="text" name="firstname" value={formVal.firstname} onChange={handleChange} placeholder="First Name"/>
                                </div>
                                <div className="filler"></div>
                                <div className="flex-grow" style={{width: '45%'}}>
                                    <Input className="input-field" type="text" name="lastname" value={formVal.lastname} onChange={handleChange} placeholder="Last Name"/>
                                </div>
                            </div>
                            <div>
                                <Input className="input-field" type="email" name="email" value={formVal.email} onChange={handleChange} placeholder= {user.email}/>
                            </div>
                            <div>
                                <Input className="input-field" type="tel" name="phone" value={formVal.phone} onChange={handleChange} placeholder="Phone Number"/>
                            </div>
                            <div>
                                <Input className="input-field" type="number" name="age" value={formVal.age} onChange={handleChange} placeholder="Age"/>
                            </div>
                            <div>
                                <Input className="input-field" type="number" name="height" value={formVal.height} onChange={handleChange} placeholder="Height"/>
                            </div>
                            <div className="filler"></div>
                            
                        </TabPanel>
                        <TabPanel value={value} index={1} className="panel">
                        <div className="skills-section">
                            <div className="skill">
                                <FormControlLabel
                                    control={<Checkbox name="horseExperience" checked={formVal.horseExperience} onChange={handleChange}/>}
                                    label="Horse Experience"
                                />
                                <Input className="input-field experience-field" type="text" name="horseExpYrs" value={formVal.horseExpYrs} disabled={ !formVal.horseExperience } onChange={handleChange} placeholder="How much (in years)?"/>
                            </div>
                            <div>
                                <FormControlLabel
                                control={<Checkbox name="riding" checked={formVal.riding} onChange={handleChange} disabled={!formVal.horseExperience} />}
                                label="Horse Riding"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Checkbox name="tacking" checked={formVal.tacking} onChange={handleChange} disabled={!formVal.horseExperience} />}
                                    label="Horse Tacking"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Checkbox name="grooming" checked={formVal.grooming} onChange={handleChange} disabled={!formVal.horseExperience} />}
                                    label="Horse Grooming"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Checkbox name="leading" checked={formVal.leading} onChange={handleChange} disabled={!formVal.horseExperience} />}
                                    label="Horse Leading"
                                />
                            </div>
                            
                        </div>
                        </TabPanel>
                        <div className="filler"></div>
                        <div>
                            {value === 0 && <Button color="primary" variant="contained" onClick={()=>setValue(1)} className="button">Proceed to Skill Selection</Button>}
                        </div>
                        <div>
                            {value === 1 && <Button color="primary" variant="contained" type="submit" className="button">Submit</Button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;