/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  onUsernameChange= (event) => {
    this.setState({ username: event.target.value });
  }


  handleSignupButtonClick = (event) => {
    if (this.state.email.endsWith('@dartmouth.edu')) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        alert(error);
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref(`users/${user.uid}`).set({
            email: this.state.email,
            username: this.state.username,
          });
          user.updateProfile({
            displayName: this.state.username,
          });
          this.props.history.push('/');
        }
      });
    } else {
      alert('Please enter a dartmouth.edu email');
    }
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="displaySignInInfoContainer">
        <div className="displaySignInInfo">
          <div className="leftJustify">
            <div className="prompt"> Enter a dartmouth.edu email: </div>
            <Input className="response" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
            <div className="prompt"> Enter your full name: </div>
            <Input className="response" placeholder="Username" onChange={this.onUsernameChange} value={this.state.username} />
            <div className="prompt"> Enter a password: </div>
            <Input type="password" className="response" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
          <div>
            <Button className="signupButtons" id="createButton" onClick={this.handleSignupButtonClick}>Sign Up</Button>
            <Button className="signupButtons" id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignUp));
