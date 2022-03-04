import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import Signup from './components/Signup/Signup.js';
import SlotPicker from './components/SlotPicker/SlotPicker';
import CreateEvent from './components/CreateEvent/CreateEvent';

function App() {
  return (
    <div className="App">
      <main>
        <Navbar></Navbar>
        <Switch>
            <Route path="/" component={Signup} exact />
            <Route path="/volunteer" component={SlotPicker} />
            <Route path="/create" component={CreateEvent} />
            {/* <Route path="/shop" component={Shop} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
