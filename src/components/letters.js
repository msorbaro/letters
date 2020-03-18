import React, { Component } from 'react';
import * as db from '../services/datastore';


class Letters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  updateHeartsIncrease = () => {
    db.increaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.updatedHeartCallBack);
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.updatedHeartCallBack);
  }


  updatedHeartCallBack = () => {
    console.log('updated');
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
        <button onClick={this.updateHeartsIncrease}
          type="button"
        >
          Update Letter Hearts Increase
        </button>
        <button onClick={this.updateHeartsDecrease}
          type="button"
        >
          Update Letter Hearts Decrease
        </button>
      </div>
    );
  }
}

export default Letters;
