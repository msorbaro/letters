import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Login extends Component {
  render() {
    return <div> Hi this is login, if youre seeing this you are NOT logged in </div>;
  }
}

export default withRouter((Login));
