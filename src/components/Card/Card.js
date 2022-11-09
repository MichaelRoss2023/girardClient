import './Card.css';

function Card(props) {
    let backgroundColor = props.disabled ? '#d9d9d9' : props.signedForOne ? '#3700B3' : 'white';
    let textColor = props.signedForOne ? 'white' : 'black';
    let styles = {backgroundColor: backgroundColor, minHeight: '12vh', color: textColor};
    let content = <div className="card" onClick={props.onClick} style={{...styles, ...props.style}}>{props.children}</div>;
    return content;
}

export default Card;