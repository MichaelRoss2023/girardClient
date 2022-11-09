function Error(props) {
    const style = {color: 'red', fontSize: '0.75rem', textAlign: 'left', marginTop: '0px'};
    return <p style={style}>{props.message}</p>;
}

export default Error;