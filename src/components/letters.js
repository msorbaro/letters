import React, { Component } from 'react';
import * as db from '../services/datastore';


class Letters extends Component {
  componentDidMount() {
    db.getLetters(this.recievedLetters);
    console.log('here');
  }

  recievedLetters = (letters) => {
    console.log(letters);
  }

  sendLetter = () => {
    db.addLetter('Test Letter');
  }

  render() {
    return (
      <div style={{
        marginTop: 100, width: '100%', height: '100%',
      }}
      >
        <button onClick={this.sendLetter}
          type="button"
        >
          Send Test Letter
        </button>
      </div>
    );
  }
}

export default Letters;
