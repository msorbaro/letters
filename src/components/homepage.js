import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class homepage extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.setState({ username: user.displayName });
        this.setState({ authenticated: true });
      }
    });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <div className="homepageContainer">
          <div className="homepageText">
            Welcome to Vox Clamantis, a platform to make your voice
            heard throughout the next several weeks as Dartmouth makes
            administrative decisions regarding the coming terms.
            We believe there is strength in both numbers and honesty,
            so log in to add your voice.
          </div>
        </div>
      );
    } else {
      return (
        <div className="homepageContainer">
          <div className="homepageText">
            You are now logged in! As a reminder please
            be respectful in your submissions. This site is here to
            give the TaskForce(tm) an idea of what the student
            body as a whole is thinking. If your actions are deemed
            inappropriate you will be removed.
          </div>
        </div>
      );
    }
  }
}

export default withRouter((homepage));
