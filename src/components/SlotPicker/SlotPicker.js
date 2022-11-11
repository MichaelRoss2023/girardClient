import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './SlotPicker.css';
import mockData from '../../mock/mock';
import Card from '../Card/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SimpleModal from '../Modal/Modal';
import CustomAccordion from '../Accordion/Accordion';
import InfoIcon from '@material-ui/icons/Info';


function SlotPicker(props) {
    const [state, setState] = useState([]);
    const [positionFilter, setPositionFilter] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [open, setOpen] = React.useState(false);
    const [body, setBody] = React.useState('');
    const history = useHistory();

   //Array to display the day header
    const displaydays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //Create the arrays for
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'All'];
    //Array for display of months and calculation of data
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    //Gets the data of today to set the starting area
    let today = new Date();
    const [currentMonth, setMonth] = useState(today.getMonth()); // months are zero-indexed; so this function would return 10 for November instead of 11
    const [currentYear, setYear] = useState(today.getFullYear());


    useEffect(() => {
        async function fetchData(month, year) {
            let res = await getData(month, year);
            let dayOfWeek = new Date(res.data[0].date).getDay();
            let emptySlots = new Array(dayOfWeek);
            setState({
                ...state,
                lessonData: [...emptySlots, ...res.data],
                originalData: [...emptySlots, ...res.data]
            });
        }
        fetchData(currentMonth + 1, currentYear);
    }, [currentMonth, currentYear]);


    //Gets data from data !!!!CURRENTLY USING MOCK DATA!!!
    let getData = async () => {
        // fetch(URL).then(res => resolve(res));
        console.log('hi', mockData);
        return mockData;
    };

    //Apply the position search by using filter
    const searchByPosition = (e) => {
        setPositionFilter(e.target.value);
        console.log('Searching by position', e.target.value);
        filter(e.target.value, dayOfWeek);
    }

    //Apply the day search using filter
    const searchByDay = (e) => {
        setDayOfWeek(e.target.value);
        console.log('Searching by day', e.target.value, dayOfWeek);
        filter(positionFilter, e.target.value);
    }


    //Uses position and day to narrow down searches. day 7 == all
    const filter = (position, day) => {
        position = position.toString().toLowerCase();
        let invalidDay = isNaN(parseInt(day)) || day < 0 || day > 7;
        let invalidPosition = position.length === 0;
        let temp;
        if(invalidDay && invalidPosition) {
            temp = state.originalData;
        } else {
            temp = state.originalData.map(item => {
                let isTruthy = true;
                let positions = item && item.positions ? Object.keys(item.positions): null;
                if (position.length && positions && positions.length) {
                    isTruthy = positions.some((pos) => {
                        let p = pos.toString().toLowerCase();
                        return p.includes(position);
                    });
                    if(!isTruthy) {
                        return null;
                    }
                    if(isNaN(parseInt(day)) || day < 0 || day > 7) {
                        return item;
                    }
                }
                if(day == 7)
                {
                    isTruthy = (item && item.date);
                }
                else
                {
                    isTruthy = (item && item.date && (new Date(item.date).getDay() === day));
                }
                return isTruthy ? item : null;
            });
        }

        setState({
            ...state,
            lessonData: temp
        });
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: '10rem',
          height: '4rem'
        }
    }));

    const classes = useStyles();

    const changeMonth = (type) => {
        let month;
        switch(type) {
            case 'forward':
                month = (currentMonth + 1) % 12;
                if (month === 0) {
                    setYear(currentYear + 1);
                }
                setMonth(month);
                break;
            case 'backward':
                month = currentMonth - 1;
                month = month < 0 ? 11 : month;
                if (month === 11) {
                    setYear(currentYear - 1);
                }
                setMonth(month);
                break;
            default:

        }
    };

    const openModal = () => {
        setOpen(true);
    }

    const signUp = (data) => {
        console.log('Signing up for time slot', data);
    }

    const viewSlotDetails = (data) => {
        console.log('Viewing slot details', data);
        const temp = <CustomAccordion data={data} handleClose={handleClose} signUp={signUp} />
        setBody(temp);

        openModal();
    }


    //Shows the legend when the info button is clicked
    const showInfo = () => {
        let temp = <div style={{padding: '20vh 30%'}}>
            <h2 style={{paddingLeft: '40px'}}>Legend</h2>
            <ul style={{textDecoration: 'none'}}>
                <li className="flex"><div className="square purple"></div> You're registered for at least one time slot on this day</li>
                <li className="flex"><div className="square white"></div> There are open slots available to volunteer on this day</li>
                <li className="flex"><div className="square gray"></div> There are no slots available on this day</li>
            </ul>
        </div>;
        setBody(temp);
        openModal();
    }

    const handleClose = () => {
        setOpen(false);
    };


    const createNewEvent = () => {
        history.push('/create');
    }
    
    let content = (
        <div className="calendar-container">
            <div className="flex">
                <div className="volunteer-heading">Choose a slot to Volunteer</div>
                <div className="month-picker">
                    <ArrowBackIosIcon className="clickable" onClick={() => changeMonth('backward')}/><span className="month-text">{months[currentMonth]}  {currentYear}</span><ArrowForwardIosIcon className="clickable" onClick={() => changeMonth('forward')}/>
                </div>
                <Input type="text" style={{width: '20%'}} value={positionFilter} onChange={searchByPosition} placeholder="Search by position"/>
                <FormControl className={classes.formControl}>
                    <InputLabel id="dayFilter">Select Day</InputLabel>
                    <Select labelId="dayFilter" id="demo-simple-select" value={dayOfWeek} onChange={searchByDay} >
                        { days.map((day, ind) => <MenuItem key={ind} value={ind}>{day}</MenuItem>) }
                    </Select>
                </FormControl>
            </div>
            <Card style={{minHeight: 'fit-content', padding: '1%'}}>
            <div className="grid">
                { displaydays.map((day, dayIndex) => <div key={dayIndex} style={{fontWeight: 'bold'}}>{day}</div> ) }
            </div>
            <div className="grid five-rows">
                {
                state.lessonData && state.lessonData.map((item, ind) => {
                    return ( 
                    <Card 
                        key={ind} style={{padding: '2% 5%'}} 
                        disabled={ !item || !item.positions || !Object.keys(item.positions).length ? true : false} 
                        signedForOne={item && item.signedForOne} 
                        onClick={() => viewSlotDetails(item)}
                    >
                            <div className="flex col-flex">
                            <div style={{fontWeight: 'bold', marginBottom: '1rem'}} >{item && item.date ? item.date : ''}</div>
                            <div className="flex-grow"></div>
                            <div className="positions flex flex-grow">
                                { item && item.positions && Object.keys(item.positions) && Object.keys(item.positions).map((pos, i) => <div key={i}>{pos}</div>)}
                            </div>
                        </div>
                    </Card> );
                })
                }
            </div>
            <AddCircleIcon style={{fontSize:"3.5rem"}} color="secondary" id="CreateEventStart" onClick={createNewEvent} className="create-event"/>
            <InfoIcon style={{fontSize:"3.5rem"}} color="secondary" onClick={showInfo} className="show-info"/>

            <div className="event">
                <SimpleModal open={open} body={body} handleClose={handleClose} />
            </div>
            </Card>
        </div>
    );

    return content;
}

export default SlotPicker;