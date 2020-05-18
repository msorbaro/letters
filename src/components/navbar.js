import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import '../style.scss';

/*
Component for all the nav links
*/
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    };
  }

  // need to get if the user is logged in or not
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      }
    });
  }

  // allows the user to sign out
  signout = () => {
    firebase.auth().signOut().then(() => {
      console.log('logged out');
    }).catch((error) => {
      console.log('wait, could not sign out');
    });
    this.setState({ authenticated: false });
  }

  // renter and routes all our links
  renderNav() {
    if (this.state.authenticated) {
      return (
        <div className="fullNav">
          <div className="logoutHolder">
            <li>
              <NavLink to="/">
                <Button className="actionButton" id="signoutButton" onClick={this.signout}>Sign Out</Button>
              </NavLink>
            </li>
          </div>
          <div className="navRight">
            <li id="letters">
              <NavLink to="/letters" activeClassName="navbar__link--active">
                <Button className="actionButton" id="signupButton">
                  <div className="mailbutton" />
                  Letters
                </Button>
              </NavLink>
            </li>
            <li id="questions">
              <NavLink to="/questions" activeClassName="navbar__link--active">
                <Button className="actionButton" id="signoutButton">
                  <div className="pollbutton" />
                  Polls
                </Button>
              </NavLink>
            </li>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navRight">
          <li id="signup"><NavLink to="/signup" activeClassName="navbar__link--active"><Button className="actionButton" id="signinButton">Sign Up</Button></NavLink></li>
          <li id="signin"><NavLink to="/signin" activeClassName="navbar__link--active"><Button className="actionButton" id="signinButton">Sign In</Button></NavLink></li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        {this.renderNav()}
      </nav>
    );
  }
}

// export default NavBar;
export default withRouter((NavBar));
