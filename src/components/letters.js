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
    const date = this.getCurrentDate();

    db.addLetter(text, title, this.state.username, date);
    this.setState({ showCreateLetterInfo: false });
  }


  createLetter = () => {
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
    if (this.state.showCreateLetterInfo) {
      console.log('SHOULD BE HERE');
      document.body.style.overflow = 'unset';
    }
  }

    getCurrentDate = (separator = '/') => {
      const newDate = new Date();
      const date = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();
      const hours = newDate.getHours();
      const minute = newDate.getMinutes();

      return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}${' '}${hours}${':'}${minute}`;
    }

    render() {
      //      console.log('HERE IS THE DATE YAY');
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
              key={id}
              id={id}
              author={info.author}
              letter={info.letter}
              title={info.title}
              date={info.date}
            />
          );
        });
      }

      const createButton = this.state.showCreateLetterInfo ? null : (
        <div className="createLetterButtonContainer">
          <button onClick={this.createLetter}
            type="button"
          >
            <a href="#top">

              <div className="penIcon" />
            Write A Letter
            </a>
          </button>
        </div>
      );


      if (this.state.authenticated) {
        return (
          <div className="lettersNormalMainStyle">
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
