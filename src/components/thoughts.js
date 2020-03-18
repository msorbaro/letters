import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Thoughts extends Component {
  render() {
    return <div> Hi this is thoughts, if youre seeing this you are logged in </div>;
  }
}

export default withRouter((Thoughts));
