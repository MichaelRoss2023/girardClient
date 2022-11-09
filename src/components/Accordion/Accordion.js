import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './Accordion.css';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'white',
    boxShadow: '2px 4px 8px #ababab',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {

      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    padding: theme.spacing(2),
  }
}))(MuiAccordionDetails);

export default function CustomAccordion(props) {
const [expanded, setExpanded] = React.useState('');
const [subExpanded, setSubExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleSubChange = (panel) => (event, newExpanded) => {
    setSubExpanded(newExpanded ? panel : false);
  };

  let data = props.data;

  return (

        <div>
            <CloseIcon style={{float: 'right', fontSize: '2rem', cursor: 'pointer'}} onClick={props.handleClose} />
            <div className="modal-heading">{data.date}</div>
            {
                data && data.positions && Object.keys(data.positions).length && Object.keys(data.positions).map((pos, index) => {
                    return (
                        <Accordion key={index} square expanded={expanded === `panel-${index}`} onChange={handleChange(`panel-${index}`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{pos}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    data.positions[pos].timeSlots && data.positions[pos].timeSlots.length && data.positions[pos].timeSlots.map((time, timeIndex) => {
                                        return (
                                            <Accordion key={timeIndex} square expanded={subExpanded === `subpanel-${pos.name}-${timeIndex}`} onChange={handleSubChange(`subpanel-${pos.name}-${timeIndex}`)}>
                                                <AccordionSummary id={`subpanel-${timeIndex}-header`} >
                                                    <div style={{ display: 'flex', flex: '1 1 auto', justifyContent: 'space-between', alignItems: 'center', verticalAlign:'center', height: '1rem'}}>
                                                        <h3>{time.startTime} - {time.endTime}</h3>
                                                        <div>{time.signedUp} of {time.reqd} filled</div>
                                                        <Button variant="contained" color="primary" onClick={() => props.signUp(time)}>Sign up</Button>
                                                    </div>

                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    { time && time.volunteers && time.volunteers.map((vol, volInd) => {
                                                         return (<div key={volInd} style={{ display: 'flex', flex: '1 1 auto', justifyContent: 'space-between', alignItems: 'center', verticalAlign:'center'}}>
                                                         <h3>{vol.name}</h3>
                                                         <Button variant="contained" className="red-button" style={{backgroundColor: '#aa0000 !important'}} onClick={() => props.cancel(time)}>Cancel</Button>
                                                     </div>)
                                                    }) }
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            
        </div>
  );
}
