import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    let content = (
    <div className="navbar">
        <div className="content">
            <span className="npo-heading">Girard Training Stables</span>
            <span className="filler"></span>
            <ul className="links">
            <li>
                <Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
            </li>
            <li>
                <Link to="/" style={{ textDecoration: 'none' }}>Sign Up</Link>
            </li>
            <li>
                <Link to="/volunteer" style={{ textDecoration: 'none' }}>Calendar</Link>
            </li>
            {/* <li>
                <Link to="account" style={{ textDecoration: 'none' }}>Account</Link>
            </li> */}
            </ul>
            <AccountCircleIcon fontSize="default" style={{margin: '5px 15px', fontSize: '2.5rem'}}/>
        </div>
    </div>
    );
    return content;
}

export default Navbar;