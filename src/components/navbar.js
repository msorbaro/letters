import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class NavBar extends Component {
  signout = () => {
    console.log('signing out');
  }

  renderNav() {
    return (
      <div className="navRight">
        <li id="letters"><NavLink to="/"><Button className="actionButton" id="signoutButton" onClick={this.signout}>Sign Out</Button></NavLink></li>
        <li id="thoughts"><NavLink to="/thoughts"><Button className="actionButton" id="signinButton">Thoughts</Button></NavLink></li>
        <li id="letters"><NavLink to="/letters"><Button className="actionButton" id="signupButton">Letters</Button></NavLink></li>
      </div>
    );
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
