import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import LogIn from './components/logIn.js';
import Profile from './components/profile.js';
import NotFound from './components/notFound.js';
//
// function App() {
//   return (
//     <div className="App">
//       <LogIn />
//     </div>
//   );
// }

  const App = props => {
    return(
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />

          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LogIn} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }

export default App;
