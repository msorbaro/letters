import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NavBar from '../components/navbar';
import Letters from '../components/letters';
import Thoughts from '../components/thoughts';
import Login from '../components/login';
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
          <Route exact path="/" component={Login} />
          <Route exact path="/letters" component={Letters} />
          <Route path="/thoughts" component={Thoughts} />

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
