import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import OneLetter from './OneLetter';
import NewLetterModal from './newLetterModal';
import * as db from '../services/datastore';

class Letters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: null, authenticated: false, username: '', showCreateLetterInfo: false,
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

  sendLetter = (title, text) => {
    db.addLetter(text, title, this.state.username);
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
    console.log('Here');
    console.log(this.state.showCreateLetterInfo);
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
  }
  //
  // updatedHeartCallBack = () => {
  //   console.log('updated');
  // }

  // handleTitleChange = (event) => {
  //   this.setState({ title: event.target.value });
  // }
  //
  // handleTextChange = (event) => {
  //   this.setState({ text: event.target.value });
  // }

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
            author={info.author}
            letter={info.letter}
            title={info.title}
          />
        );
      });
    }

    const createButton = this.state.showCreateLetterInfo ? null : (
      <div className="createLetterButtonContainer">
        <button onClick={this.createLetter}
          type="button"
        >
          <div className="penIcon" />
            Write A Letter
        </button>
      </div>
    );


    if (this.state.authenticated) {
      return (
        <div style={{
          marginTop: 15, width: '100%', height: '100%',
        }}

        >
          <NewLetterModal onCloseAndSubmit={this.sendLetter} onClose={this.createLetter} show={this.state.showCreateLetterInfo} />
          <div style={{
            displey: 'flex', 'align-content': 'center', justifyContent: 'center', 'justify-content': 'center',
          }}
            className="tryingToCenter"
          >
            {letterObject}
          </div>
          {createButton}

        </div>
      );
    } else {
      return (<div> no </div>);
    }
  }
}

export default withRouter((Letters));
