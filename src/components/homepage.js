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

  // sees if someone is logged in for the homepage
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <div className="homepageContainer">
          <div className="homepageText">
            Welcome to Dear Hanlon, a platform to share your opinion
            throughout the next several weeks as Dartmouth makes
            administrative decisions regarding the coming terms.
            <br />
            {' '}
            <br />
            By logging in you gain access to letters different students
            have sent to President Hanlon or the COVID-19 Task Force and can
            like the messages you agree with. Furthermore, you can create, vote
            and comment on current questions the student body has regarding the
            coming months at Dartmouth.
            <br />
            {' '}
            <br />
            Our hope is that this site serves to aggregate data on student
            viewpoints and arguments that the Task Force and President Hanlon
            can then take into consideration throughout their deliberation
            process.
            <br />
            {' '}
            <br />
            Sign up now to add your perspective.
          </div>
        </div>
      );
    } else {
      return (
        <div className="homepageContainer">
          <div className="homepageText">
            You are now logged in!
            <br />
            {' '}
            <br />
            As a reminder please be respectful. This is not Librex, this is
            not anonymous. Every comment and post is attached to your name
            and email address. This is an opportunity for student opinions
            to be shared with the administration. If your actions are deemed
            inappropriate you will be removed and we will not feel bad.
          </div>
        </div>
      );
    }
  }
}

export default withRouter((homepage));
