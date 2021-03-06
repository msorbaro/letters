import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NavBar from './components/navbar';
import Letters from './components/letters';
import Signup from './components/signup';
import SignIn from './components/signin';
import Homepage from './components/homepage';
import Questions from './components/questions';
// import requireAuth from '../components/requireAuth';
import './style.scss';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/letters" component={Letters} />
          <Route path="/questions" component={Questions} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

// component={requireAuth() => <CreateTrip isEditMode={true} />}
ReactDOM.render(
  <App />,
  document.getElementById('main'),
);
