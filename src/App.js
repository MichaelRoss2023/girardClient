import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Signup from './components/Signup/Signup.js';
import SlotPicker from './components/SlotPicker/SlotPicker';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile'

sessionStorage.setItem("email",'');

function App() {
  return (
    <div className="App">
      <main>
        <Navbar></Navbar>
        <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/volunteer" component={SlotPicker} />
            <Route path="/create" component={CreateEvent} />
            <Route path="/profile" component={Profile} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
