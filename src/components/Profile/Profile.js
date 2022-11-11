import './Profile.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { red } from '@material-ui/core/colors';


//variable to ensure that axios only checks once
var counter = 0;
let history = useHistory ();

var submitForm = {
  "firstName": "",
  "lastName": "",
  "userType": 'volunteer',
  "email": "",
  "phoneNumber": "",
  "height": "",
  "age": "",
  "horseExperience": "",
  "horseRiding": "",
  "horseTacking": "",
  "horseGrooming": "",
  "horseLeading": ""
}


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const saveData = () => {
    history.push("/volunteer");
}
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(counter == 0){
    if(isAuthenticated)
    {
        var safeEmail = user.email;
    }
    else
    {
        var safeEmail = "BAD@gmail.com"
    }

    console.log("Pre Axios email", safeEmail);

    axios.get('/users', { params: { email: safeEmail } } )
    .then(res => {
        console.log("Axio return",res.data);
        submitForm.firstName = res.data.firstName;
        submitForm.lastName = res.data.lastName;
    })
    .catch(err => console.log("Error in Profile",err.data));
  }


  console.log("SubmitForm firstName",submitForm.firstName)
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} /> 
      <div className="row">
          <div className="column">
              <Input className="input-field" type="text" name="firstname" value={submitForm.firstName}  placeholder="First Name"/>
              <Input className="input-field" type="text" name="lastname" value={submitForm.lastName}  placeholder="Last Name"/>
              <Input className="input-field" type="email" name="email" value="" placeholder="Email"/>
              <Input className="input-field" type="tel" name="phone" value=""  placeholder="Phone Number"/>
              <Input className="input-field" type="number" name="age" value=""  placeholder="Age"/>
              <Input className="input-field" type="number" name="height" value=""  placeholder="Height in Inches"/>
          </div>
          <div className="column">
            <h3>Horse Experience</h3>
            <Input className="input-field experience-field" type="text" name="horseExpYrs" value="" placeholder="Years?"/> Years <br></br>
            <FormControlLabel control={<Checkbox name="riding" checked={false} />} label="Horse Riding" /> <br></br>
            <FormControlLabel control={<Checkbox name="tacking" checked={false} />} label="Horse Tacking"/> <br></br>
            <FormControlLabel control={<Checkbox name="grooming" checked={false} />} label="Horse Grooming"/> <br></br>
            <FormControlLabel control={<Checkbox name="leading" checked={false}/>} label="Horse Leading"/> <br></br>
          </div>
      </div>
      <Button color="primary" type="submit" variant="contained" id="SaveProfile" onClick={saveData}style={{ width: '100%', margin: '3rem 0 0 0' }}>Save</Button>
      </div>
    )
  );
};

export default Profile;