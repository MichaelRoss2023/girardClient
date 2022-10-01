import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Navbar.css';
import { Link } from 'react-router-dom';
import React from "react";
import Button from '@material-ui/core/Button'
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

    const { logout } = useAuth0();

        return  (
            isAuthenticated && (
            <div className="navbar">
                <div className="content">
                    <span className="npo-heading">Girard Training Stables</span>
                    <span className="filler"></span>
                    <ul className="links">
                    <li>
                        <Link to="/volunteer" style={{ textDecoration: 'none' }}>Calendar</Link>
                    </li>
                    <li>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>
                    </li>
                    <Button color="primary" variant="text" onClick={() => logout({ returnTo: "https://girard-client.herokuapp.com" })} className="button" id="Log_Out_Button">Log Out</Button>
                    </ul>
                </div>
            </div>
        ));
    }

export default Navbar;