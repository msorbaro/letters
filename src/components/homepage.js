import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class homepage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="navRight">
        hi and welcome to the home Homepage
      </div>
    );
  }
}

export default withRouter((homepage));
