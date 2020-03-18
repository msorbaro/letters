import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  handleSigninButtonClick = (event) => {
    firebase.auth().signInWithEmailAndPassword(`${this.state.email}@dartmouth.edu`, this.state.password).catch((error) => {
      alert(error);
    });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="displaySignInInfo">
        <h1>Sign In</h1>
        <div id="dartmouthEmailInputBar">
          <Input className="inputBar" id="emailInputBar" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
          <Input type="text" id="dartmouthEdu" value="@dartmouth.edu" readOnly />
        </div>
        <Input type="password" className="inputBar" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        <div className="updateSignInButtons">
          <Button className="actionButton" id="createButton" onClick={this.handleSigninButtonClick}>Create</Button>
          <Button className="actionButton" id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignIn));
