import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      }
    });
  }

  signout = () => {
    firebase.auth().signOut().then(() => {
      console.log('signed out');
    }).catch((error) => {
      console.log('wait, could not sign out');
    });
    this.setState({ authenticated: false });
  }

  renderNav() {
    if (this.state.authenticated) {
      return (
        <div className="navRight"
          style={{
            'list-style-type': 'none', display: 'flex', 'flex-direction': 'row', marginTop: '10%',
          }}
        >
          <li id="logout"><NavLink to="/"><Button className="actionButton" id="signoutButton" onClick={this.signout}>Sign Out</Button></NavLink></li>
          <li id="thoughts"><NavLink to="/thoughts"><Button className="actionButton" id="signinButton">Thoughts</Button></NavLink></li>
          <li id="letters"><NavLink to="/letters"><Button className="actionButton" id="signupButton">Letters</Button></NavLink></li>
          <li id="questions"><NavLink to="/questions"><Button className="actionButton" id="signoutButton">Questions</Button></NavLink></li>

        </div>
      );
    } else {
      return (
        <div className="navRight"
          style={{
            'list-style-type': 'none', display: 'flex', 'flex-direction': 'row', marginTop: '10%',
          }}
        >
          <li id="signup"><NavLink to="/signup"><Button className="actionButton" id="signinButton">Sign Up</Button></NavLink></li>
          <li id="signin"><NavLink to="/signin"><Button className="actionButton" id="signinButton">Sign In</Button></NavLink></li>
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
