import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import * as db from '../services/datastore';
import OneLetter from './OneLetter';
import '../style.scss';


class Letters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: null, authenticated: false, username: '', showCreateLetterInfo: false, title: '', text: ' ',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
        this.setState({ username: user.displayName });
      }
    });

    db.getLetters(this.recievedLetters);
  }

  recievedLetters = (letter) => {
  //  console.log(letter);
    this.setState({ letters: letter });
  }

  sendLetter = () => {
    db.addLetter(this.state.text, this.state.title, this.state.username);
    this.setState({ showCreateLetterInfo: false });
  }

  // updateHeartsIncrease = () => {
  //   db.increaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.state.userID, this.updatedHeartCallBack);
  // }
  //
  // updateHeartsDecrease = () => {
  //   db.decreaseLetterScore('-M2jK_4ww8e4MbgB2ofI', this.state.userID, this.updatedHeartCallBack);
  // }

  createLetter = () => {
    this.setState({ showCreateLetterInfo: true });
  }
  //
  // updatedHeartCallBack = () => {
  //   console.log('updated');
  // }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
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

    const createLetter = this.state.showCreateLetterInfo ? (
      <div>
        <p>Title:</p>
        <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        <p>Text</p>
        <input type="text" value={this.state.text} onChange={this.handleTextChange} />
        <button onClick={this.sendLetter}
          type="button"
        >
        Send Letter
        </button>
      </div>
    ) : null;

    if (this.state.authenticated) {
      return (
        <div style={{
          marginTop: 15, width: '100%', height: '100%',
        }}

        >
          <div style={{
            displey: 'flex', 'align-content': 'center', justifyContent: 'center', 'justify-content': 'center',
          }}
            className="tryingToCenter"
          >
            {letterObject}
          </div>

          <button onClick={this.createLetter}
            type="button"
          >
          Create Letter
          </button>
          {createLetter}
        </div>
      );
    } else {
      return (<div> no </div>);
    }
  }
}

export default withRouter((Letters));
