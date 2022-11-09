import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    if(sessionStorage.getItem("email") != '')
    {
        let loggedin = true;
    }
    else
    {
        let loggedin = false;
    }

    //if(loggedin){
    if(false){
        let content = (
        <div className="navbar">
            <div className="content">
                <span className="npo-heading">Girard Training Stables</span>
                <span className="filler"></span>
                <ul className="links">
                <li>
                    Log Out
                </li>
                <li>
                    <Link to="/volunteer" style={{ textDecoration: 'none' }}>Calendar</Link>
                </li>
                <li>
                    Account
                </li>
                </ul>
                <AccountCircleIcon fontSize="default" style={{margin: '5px 15px', fontSize: '2.5rem'}}/>
            </div>
        </div>
        );
    return content; }

    else{
        let content = (
        <div className="navbar">
            <div className="content">
                <span className="npo-heading">Girard Training Stables</span>
                <span className="filler"></span>
                <ul className="links">
                <li>
                    <Link to="/loginPrompt" style={{ textDecoration: 'none' }}>Log In</Link>
                </li>
                <li>
                    <Link to="/" style={{ textDecoration: 'none' }}>Sign Up</Link>
                </li>
                </ul>
            </div>
        </div>
        );
        return content;
    }
}

export default Navbar;