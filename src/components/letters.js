import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import * as db from '../services/datastore';
import OneLetter from './OneLetter';

class Letters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: null, authenticated: false, username: '', userID: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
        this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
        db.fetchYourGroups(this.state.currUserId, this.setYourGroups);
      }
    });

    db.getLetters(this.recievedLetters);
  }

  recievedLetters = (letter) => {
  //  console.log(letter);
    this.setState({ letters: letter });
  }

  sendLetter = () => {
    db.addLetter('Test Letter', 'TestTitle', this.state.username);
  }

  updateHeartsIncrease = () => {
    db.increaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.state.userID, this.updatedHeartCallBack);
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.state.userID, this.updatedHeartCallBack);
  }


  updatedHeartCallBack = () => {
    console.log('updated');
  }

  render() {
    console.log(this.state.letters);

    let letterObject = null;
    if (this.state.letters != null) {
      letterObject = Object.keys(this.state.letters).map((id) => {
      //  console.log(`I am id: ${id}`);
        // console.log('other stuff bellow');
        // console.log(id);
        const info = this.state.letters[id];
        //  console.log(info);
        return (
          // assuming gets props ID, letter, amount of likes, title
          <OneLetter
            id={id}
            letter={info.letter}
            likes={info.score}
            title={info.title}
          />
        );
      });
    }
    if (this.state.authenticated) {
      return (
        <div style={{
          marginTop: 100, width: '100%', height: '100%',
        }}
        >
          {letterObject}

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
    } else {
      return (<div> no </div>);
    }
  }
}

export default withRouter((Letters));
