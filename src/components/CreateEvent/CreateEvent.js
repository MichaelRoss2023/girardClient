import DatePicker from '../Datepicker/Datepicker';

import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '../Card/Card';
import Timepicker from '../Timepicker/Timepicker';
import axios from 'axios';

function CreateEvent(props) {

    const [formVal, setFormValue] = useState({
        startDate: '',
        endDate: '',
        recurring: false,
        interval: '',
        startTime: '',
        endTime: '',
        startTimeHr: '',
        startTimeMinute: '',
        endTimeHour: '',
        endTimeMinute: '',
        positions: [],
        lessonAssistantReq: false,
        horseLeaderReq: false,
        barnCrewReq: false,
        pastureCrewReq: false,
        sidewalkerReq: false,
        lessonAssistantCount: '',
        horseLeaderCount: '',
        barnCrewCount: '',
        pastureCrewCount: '',
        sidewalkerCount: '',
        instructor: ''
    });

    const [instructors, setInstructors] = useState({});
    const [instructorsArr, setInstructorsArr] = useState([]);

    const intervals = ['Every day', 'Two Days', 'Three Days', 'Four Days', 'Five Days', 'Six Days', 'Weekly'];


    /*const axios = require("axios");

        const options = {
            method: "POST",
            url: "https://girard-server.herokuapp.com/lessons",
            headers: {"authorization":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im0tTnJzLS10Y0txLU9XSEdiNjVlayJ9.eyJpc3MiOiJodHRwczovL2Rldi02aXItNnFjZC51cy5hdXRoMC5jb20vIiwic3ViIjoicVhOY2xPV1VPbXp0Z29Fekx5QzRmR0haQWplYkNnWGNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ2lyYXJkLXNlcnZlci5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY2NjQwNTM1MSwiZXhwIjoxNjY2NDkxNzUxLCJhenAiOiJxWE5jbE9XVU9tenRnb0V6THlDNGZHSFpBamViQ2dYYyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rI_WMgKOLdMMgjVbb9pVe5qd9dq2S17iZXI8wdVgVJBIbqFUe7-MG1_79fDltL_cZUUNLRgVR3Vd-CpmQW9jTaiaIMvcHGBty2HcFsjHNu2OosLFvvsa5hlurlfgrXwYCMtNhPaRVkc1JGF8g1c_B9BdTRfY5GAHlyhLst6JvsRW9JtwACQUKqVqJ4Xv_qCL6-UOeL3n7nrSnFAPp5jvy0ZRIMkbQySJGQ2BJKvMNoLwB9GaibroWoLPSurHLhCgHOchBtSsKNcIgO-PdgF9KdDWhkI_vZ9Eo9EOqu8_kK12ngWdmsgBQJ9Ys2naHjOD3eyrkGCukWtlIY7VE-l35A"},
            startTime: formVal.startDate,
            endTime: formVal.endDate,
            instructor: fD.instructor,
            volunteers: fD.volunteers,
            horses: null,
            notes: ''
        }

        axios(options)
            .then(response => {
                console.log("Server responded: ",response.data);
            })
            .catch(error => {
                console.log("Server threw error: ",error);
            }) */

    useEffect(() => {
        //call user api to get users
        const axios = require("axios");

        const options = {
            method:"GET",
            url:"https://girard-server.herokuapp.com/users",
            headers: {"authorization":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im0tTnJzLS10Y0txLU9XSEdiNjVlayJ9.eyJpc3MiOiJodHRwczovL2Rldi02aXItNnFjZC51cy5hdXRoMC5jb20vIiwic3ViIjoicVhOY2xPV1VPbXp0Z29Fekx5QzRmR0haQWplYkNnWGNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ2lyYXJkLXNlcnZlci5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY2NjQwNTM1MSwiZXhwIjoxNjY2NDkxNzUxLCJhenAiOiJxWE5jbE9XVU9tenRnb0V6THlDNGZHSFpBamViQ2dYYyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rI_WMgKOLdMMgjVbb9pVe5qd9dq2S17iZXI8wdVgVJBIbqFUe7-MG1_79fDltL_cZUUNLRgVR3Vd-CpmQW9jTaiaIMvcHGBty2HcFsjHNu2OosLFvvsa5hlurlfgrXwYCMtNhPaRVkc1JGF8g1c_B9BdTRfY5GAHlyhLst6JvsRW9JtwACQUKqVqJ4Xv_qCL6-UOeL3n7nrSnFAPp5jvy0ZRIMkbQySJGQ2BJKvMNoLwB9GaibroWoLPSurHLhCgHOchBtSsKNcIgO-PdgF9KdDWhkI_vZ9Eo9EOqu8_kK12ngWdmsgBQJ9Ys2naHjOD3eyrkGCukWtlIY7VE-l35A"}
        }
        axios(options)
            .then(res => {
                console.log('users recieved');
                allUsers = res.data;
                console.log("RESULT: ", res.data);
                var allUsers = res.data.filter(user => user.userType == "volunteer");
                var map = new Map(res.data.map(obj => {
                    return [obj.firstName, obj];
                }));
                console.log("map: ", map);
                setInstructors(map);
                setInstructorsArr(Array.from(map.keys()));
            })
            .catch(err => console.log(err.data));

        //console.log("All Users: ", allUsers);

        //setInstructors(allUsers.filter(user => user.userType == "volunteer"));
      }, []);

    const createNewEvent = () => {

    };

    const handleChange = (event) => {
        console.log(event);
        let field = event.target.name || event.target.id; // Get which part was changed
        let value = ((event) => { // Value = event = what is returned by the function?
            switch (event.target.type) { // Returns whether the checkbox is checked or not if the field that called handleChange was a checkbox
                case 'checkbox':
                    return event.target.checked;
                default:
                    return event.target.value; // Returns the value of the field otherwise
            }
        })(event);

        setFormValue({ // Set the value of the form field to the value of the field that called handleChange
            ...formVal,
            [field]: value
        });
    }

    const submitEventRequest = (e) => {
        e.preventDefault()
        console.log('Event submit')
        console.log('form: ', formVal.instructor);
        console.log('form inst: ', instructors.get(instructorsArr[formVal.instructor]));
        let fD = {};    // The event that we will submit - starts empty
        let startDate = new Date(formVal.startDate);
        let endDate = new Date(formVal.endDate);
        fD.instructor = instructors.get(instructorsArr[formVal.instructor]);
        fD.volunteers = { // Initialize all the values that we will get from the user as empty to begin.
            "barn crew": {
                minVolunteers: formVal.barnCrewCount || 0,
                signedUp: []
            },
            "pasture crew": {
                minVolunteers: formVal.pastureCrewCount || 0,
                signedUp: []
            },
            "lesson assistant": {
                minVolunteers: formVal.lessonAssistantCount || 0,
                signedUp: []
            },
            "sidewalker": {
                minVolunteers: formVal.sidewalkerCount || 0,
                signedUp: []
            },
            "horse leader": {
                minVolunteers: formVal.horseLeaderCount || 0,
                signedUp: []
            }
        };
        fD.horses = [];
        fD.notes = '';
        // fD.bookedDates = [];

        // fD.bookedDates.push(new Date(formVal.startDate));

        // Date.prototype.addDays = function (days) {
        //     var date = new Date(this.valueOf());
        //     date.setDate(date.getDate() + days);
        //     return date;
        // }

        // let date1 = new Date(formVal.startDate);
        // if (formVal.recurring) { // Calculate the difference between date1 and date2 - determine start and end date?
        //     let date2 = new Date(formVal.endDate);
        //     let interval = formVal.interval + 1;
        //     const diffTime = Math.abs(date2 - date1);
        //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //     let temp;
        //     for (let i = interval; i <= diffDays; i += interval) {
        //         temp = date1.addDays(i);
        //         fD.bookedDates.push(temp);
        //     }
        // }

        // fD.startTime = formVal.startTime;
        // fD.endTime = formVal.endTime;
        // fD.notes = "";

        // console.log('Form Data', fD); // Store the event data we got
        // fetch('http://localhost:2222/lessons/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(fD),
        // })
        // .then((response) => response.json())
        // .then((fD) => {
        //     console.log('Success:', fD);
        // })
        // .catch((error) => {
        //     console.error('Error: error');
        // });

        const form = {
            startTime: formVal.startDate,
            endTime: formVal.endDate,
            instructor: fD.instructor,
            volunteers: fD.volunteers,
            horses: null,
            notes: ''
        }

        console.log(form)

        const axios = require("axios");

        const options = {
            method: "POST",
            url: "https://girard-server.herokuapp.com/lessons",
            headers: {"authorization":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im0tTnJzLS10Y0txLU9XSEdiNjVlayJ9.eyJpc3MiOiJodHRwczovL2Rldi02aXItNnFjZC51cy5hdXRoMC5jb20vIiwic3ViIjoicVhOY2xPV1VPbXp0Z29Fekx5QzRmR0haQWplYkNnWGNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ2lyYXJkLXNlcnZlci5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY2NjQwNTM1MSwiZXhwIjoxNjY2NDkxNzUxLCJhenAiOiJxWE5jbE9XVU9tenRnb0V6THlDNGZHSFpBamViQ2dYYyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rI_WMgKOLdMMgjVbb9pVe5qd9dq2S17iZXI8wdVgVJBIbqFUe7-MG1_79fDltL_cZUUNLRgVR3Vd-CpmQW9jTaiaIMvcHGBty2HcFsjHNu2OosLFvvsa5hlurlfgrXwYCMtNhPaRVkc1JGF8g1c_B9BdTRfY5GAHlyhLst6JvsRW9JtwACQUKqVqJ4Xv_qCL6-UOeL3n7nrSnFAPp5jvy0ZRIMkbQySJGQ2BJKvMNoLwB9GaibroWoLPSurHLhCgHOchBtSsKNcIgO-PdgF9KdDWhkI_vZ9Eo9EOqu8_kK12ngWdmsgBQJ9Ys2naHjOD3eyrkGCukWtlIY7VE-l35A"},
            startTime: formVal.startDate,
            endTime: formVal.endDate,
            instructor: fD.instructor,
            volunteers: fD.volunteers,
            horses: null,
            notes: ''
        }

        axios(options)
            .then(response => {
                console.log("Server responded: ",response.data);
            })
            .catch(error => {
                console.log("Server threw error: ",error);
            })
        /*
        axios.post('/lessons', form)
            .then(res => console.log('Lesson created'))
            .catch(err => console.log(err.data))
        */

        
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: '10rem',
            height: '4rem'
        }
    }));

    const classes = useStyles();



    return ( // Get all the data that we need from the user
        <Card style={{ width: '50%', padding: '2% 3%', margin: 'auto', justifyContent: 'center' }} className="flex flex-grow">
            <header className="heading modal-heading">Create New Event</header>
            <form className="event-form" onSubmit={submitEventRequest}>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between' }}>
                    <DatePicker id="startDate" name="startDate" label="Start Date" handleDate={handleChange} value={formVal.startDate} />
                    <DatePicker id="endDate" name="endDate" label="End Date" disabled={!formVal.recurring} handleDate={handleChange} value={formVal.endDate} />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between' }}>
                    <FormControlLabel
                        control={<Checkbox id="recurring" name="recurring" checked={formVal.recurring} onChange={handleChange} />}
                        label="Recurring Event"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-interval">Select Interval</InputLabel>
                        <Select labelId="interval" id="interval" name="interval" value={formVal.interval} disabled={!formVal.recurring} onChange={handleChange} >
                            {intervals.map((day, ind) => <MenuItem key={ind} value={ind}>{day}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between' }}>
                    <Timepicker value={formVal.startTime} id="startTime" onChange={handleChange} name="startTime" label="Start Time" />
                    <Timepicker value={formVal.endTime} id="endTime" onChange={handleChange} name="endTime" label="End Time" />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between', margin: '1rem 0' }}>
                    <FormControlLabel
                        control={<Checkbox id="lessonAssistantReq" name="lessonAssistantReq" checked={formVal.lessonAssistantReq} onChange={handleChange} />}
                        label="Lesson Assistant Required?"
                    />
                    <Input style={{ width: '49%' }} name="lessonAssistantCount" disabled={!formVal.lessonAssistantReq} onChange={handleChange} value={formVal.lessonAssistantCount} type="number" placeholder="How many?" />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between', margin: '1rem 0' }}>
                    <FormControlLabel
                        control={<Checkbox id="barnCrewReq" name="barnCrewReq" checked={formVal.barnCrewReq} onChange={handleChange} />}
                        label="Barn Crew Required?"
                    />
                    <Input style={{ width: '49%' }} name="barnCrewCount" disabled={!formVal.barnCrewReq} onChange={handleChange} value={formVal.barnCrewCount} type="number" placeholder="How many?" />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between', margin: '1rem 0' }}>
                    <FormControlLabel
                        control={<Checkbox id="pastureCrewReq" name="pastureCrewReq" checked={formVal.pastureCrewReq} onChange={handleChange} />}
                        label="Pasture Crew Required?"
                    />
                    <Input style={{ width: '49%' }} name="pastureCrewCount" disabled={!formVal.pastureCrewReq} onChange={handleChange} value={formVal.pastureCrewCount} type="number" placeholder="How many?" />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between', margin: '1rem 0' }}>
                    <FormControlLabel
                        control={<Checkbox id="horseLeaderReq" name="horseLeaderReq" checked={formVal.horseLeaderReq} onChange={handleChange} />}
                        label="Horse Leader Required?"
                    />
                    <Input style={{ width: '49%' }} name="horseLeaderCount" disabled={!formVal.horseLeaderReq} onChange={handleChange} value={formVal.horseLeaderCount} type="number" placeholder="How many?" />
                </div>
                <div className="flex flex-grow" style={{ justifyContent: 'space-between', margin: '1rem 0' }}>
                    <FormControlLabel
                        control={<Checkbox id="sidewalkerReq" name="sidewalkerReq" checked={formVal.sidewalkerReq} onChange={handleChange} />}
                        label="Sidewalker Required?"
                    />
                    <Input style={{ width: '49%' }} name="sidewalkerCount" disabled={!formVal.sidewalkerReq} onChange={handleChange} value={formVal.sidewalkerCount} type="number" placeholder="How many?" />
                </div>

                <div className="flex flex-grow" style={{ justifyContent: 'space-between' }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-instructor">Select Instructor</InputLabel>
                        <Select labelId="instructor" id="instructor" name="instructor" value={formVal.instructor} onChange={handleChange} >
                            {instructorsArr.map((instructor, ind) => <MenuItem key={ind} value={ind}>{instructor}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <Button color="primary" type="submit" variant="contained" onClick={submitEventRequest} style={{ width: '100%', margin: '3rem 0 0 0' }}>Create Event</Button>
            </form>
        </Card>
    )
}

export default CreateEvent;