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
    console.log('ehre');
    firebase.auth().createUserWithEmailAndPassword(`${this.state.email}@dartmouth.edu`, this.state.password).catch((error) => {
      console.log('we found an authentication error');
      console.log(error);
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
      }
    });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="displaySignInInfo">
        <h1>Sign Up </h1>
        <div id="dartmouthEmailInputBar">
          <Input className="inputBar" id="emailInputBar" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
          <Input type="text" id="dartmouthEdu" value="@dartmouth.edu" readOnly />
        </div>
        <Input className="inputBar" id="usernameInput" placeholder="Username" onChange={this.onUsernameChange} value={this.state.username} />
        <Input type="password" className="inputBar" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        <div className="updateSignInButtons">
          <Button className="actionButton" id="createButton" onClick={this.handleSignupButtonClick}>Create</Button>
          <Button className="actionButton" id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignUp));
