import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3700B3'
    },
    secondary: {
      main: '#03DAC5'
    }
  }
});


ReactDOM.render(
  <Auth0Provider
    domain="dev-6ir-6qcd.us.auth0.com"
    clientId="YaKtx23CDf33oUGDlVte9TpLpvT5u2oM"
    redirectUri="https://girard-client.herokuapp.com/signup"
    //redirectUri="https://localhost:3000/signup"
  >
    <React.StrictMode>
      <BrowserRouter>
       <MuiThemeProvider theme={theme}>
          <App />
       </MuiThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  </Auth0Provider>,
  document.getElementById("root")
);

/* ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
