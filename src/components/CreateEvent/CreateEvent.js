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

function CreateEvent(props) {

    const [formVal, setFormValue] = React.useState({
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
        sidewalkerReq: false,
        lessonAssistantCount: '',
        horseLeaderCount: '',
        barnCrewCount: '',
        sidewalkerCount: ''
    });

    const intervals = ['Every day', 'Two Days', 'Three Days', 'Four Days', 'Five Days', 'Six Days', 'Weekly'];

    const createNewEvent = () => {
        
    };

    const handleChange = (event) => {
        let field = event.target.name || event.target.id;
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

    const submitEventRequest = () => {
        console.log('Event submit')
        let fD = {};
        fD.instructor = '';
        fD.volunteers = {
            "barn crew": {
                required: formVal.barnCrewCount || 0,
                signedUp: []
            },
            "horse leader": {
                required: formVal.horseLeaderCount || 0,
                signedUp: []
            },
            "lesson assistant": {
                required: formVal.lessonAssistantCount || 0,
                signedUp: []
            },
            "sidewalker": {
                required: formVal.sidewalkerCount || 0,
                signedUp: []
            }
        };
        fD.horses = [];
        fD.bookedDates = [];
        
        fD.bookedDates.push(new Date(formVal.startDate));

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        let date1 = new Date(formVal.startDate);
        if(formVal.recurring) {
            let date2 = new Date(formVal.endDate);
            let interval = formVal.interval + 1;
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let temp;
            for(let i = interval; i <= diffDays; i += interval) {
                temp = date1.addDays(i);
                fD.bookedDates.push(temp);
            }
        }

        fD.startTime = formVal.startTime;
        fD.endTime = formVal.endTime;
        fD.notes = "";

        console.log('Form Data', fD);
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: '10rem',
          height: '4rem'
        }
    }));

    const classes = useStyles();



    return (
        <Card style={{width:'50%', padding: '2% 3%', margin: 'auto', justifyContent: 'center'}} className="flex flex-grow">
            <header className="heading modal-heading">Create New Event</header>
            <form className="event-form" onSubmit={submitEventRequest}>
                <div className="flex flex-grow" style={{justifyContent: 'space-between'}}>
                    <DatePicker id="startDate" name="startDate" label="Start Date" handleDate={handleChange} value={formVal.startDate} />
                    <DatePicker id="endDate" name="endDate" label="End Date" disabled={!formVal.recurring} handleDate={handleChange} value={formVal.endDate} />
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between'}}>
                    <FormControlLabel
                        control={<Checkbox id="recurring" name="recurring" checked={formVal.recurring} onChange={handleChange}/>}
                        label="Recurring Event"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-interval">Select Interval</InputLabel>
                        <Select labelId="interval" id="interval" name="interval" value={formVal.interval} disabled={!formVal.recurring} onChange={handleChange} >
                            { intervals.map((day, ind) => <MenuItem key={ind} value={ind}>{day}</MenuItem>) }
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between'}}>
                    <Timepicker value={formVal.startTime} id="startTime" onChange={handleChange} name="startTime" label="Start Time" />
                    <Timepicker value={formVal.endTime} id="endTime" onChange={handleChange} name="endTime" label="End Time" />
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between', margin: '1rem 0'}}>
                    <FormControlLabel
                        control={<Checkbox id="lessonAssistantReq" name="lessonAssistantReq" checked={formVal.lessonAssistantReq} onChange={handleChange}/>}
                        label="Lesson Assistant Required?"
                    />
                    <Input style={{width: '49%'}} name="lessonAssistantCount"  disabled={!formVal.lessonAssistantReq} onChange={handleChange}  value={formVal.lessonAssistantCount} type="number" placeholder="How many?"/>
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between', margin: '1rem 0'}}>
                    <FormControlLabel
                        control={<Checkbox id="barnCrewReq" name="barnCrewReq" checked={formVal.barnCrewReq} onChange={handleChange}/>}
                        label="Barn Crew Required?"
                    />
                    <Input style={{width: '49%'}} name="barnCrewCount" disabled={!formVal.barnCrewReq} onChange={handleChange}  value={formVal.barnCrewCount} type="number" placeholder="How many?"/>
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between', margin: '1rem 0'}}>
                <FormControlLabel
                        control={<Checkbox id="horseLeaderReq" name="horseLeaderReq" checked={formVal.horseLeaderReq} onChange={handleChange}/>}
                        label="Horse Leader Required?"
                    />
                    <Input style={{width: '49%'}} name="horseLeaderCount" disabled={!formVal.horseLeaderReq} onChange={handleChange}  value={formVal.horseLeaderCount} type="number" placeholder="How many?"/>
                </div>
                <div className="flex flex-grow" style={{justifyContent: 'space-between', margin: '1rem 0'}}>
                    <FormControlLabel
                        control={<Checkbox id="sidewalkerReq" name="sidewalkerReq" checked={formVal.sidewalkerReq} onChange={handleChange}/>}
                        label="Sidewalker Required?"
                    />
                    <Input style={{width: '49%'}} name="sidewalkerCount" disabled={!formVal.sidewalkerReq} onChange={handleChange} value={formVal.sidewalkerCount} type="number" placeholder="How many?"/>
                </div>
                <Button color="primary" type="submit" variant="contained" onClick={submitEventRequest} style={{width: '100%', margin: '3rem 0 0 0'}}>Create Event</Button>
            </form>
        </Card>
    )
}

export default CreateEvent;