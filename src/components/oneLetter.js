import React, { Component } from 'react';
// import * as db from '../services/datastore';


class OneLetter extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, letter, amount of likes, title
    this.state = {};
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <h1>
          {' '}
          {this.props.title}
          {' '}
        </h1>
        <p>
          {' '}
          {this.props.letter}
          {' '}
        </p>
        <p>
          {' '}
likes:
          {this.props.likes}
          {' '}

        </p>
        <p>
          {' '}
ID:
          {this.props.id}
        </p>
      </div>
    );
  }
}

export default OneLetter;
