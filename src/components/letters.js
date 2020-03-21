import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import '../style.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import OneLetter from './OneLetter';
import DropDown from './dropdown';
import NewLetterModal from './newLetterModal';

import * as db from '../services/datastore';

class Letters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: null,
      sortedByRecent: null,
      sortedByOld: null,
      sortedByHearts: null,
      authenticated: false,
      shopDropDown: true,
      username: '',
      showCreateLetterInfo: false,
      currentSort: 'NEW',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
        this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
      }
    });

    db.getLetters(this.recievedLetters);
  }


  showHideDropDown = () => {
    this.setState(prevState => ({ shopDropDown: !prevState.shopDropDown }));
  }

  choseDropDrow = (newState, sortedBy) => {
    this.setState({ currentSort: sortedBy });
    this.setState({ letters: newState });
  }

  recievedLetters = (letter) => {
    const newarrReverse = [];
    for (let i = 0; i < Object.keys(letter).length; i += 1) {
      const currentKey = Object.keys(letter)[i];
      const currItem = letter[currentKey];
      newarrReverse.unshift({ item: currItem, id: currentKey });
    }

    const newarrOldFirst = [];
    for (let i = 0; i < Object.keys(letter).length; i += 1) {
      const currentKey = Object.keys(letter)[i];
      const currItem = letter[currentKey];
      newarrOldFirst.push({ item: currItem, id: currentKey });
    }

    const hearts = [];
    for (let i = 0; i < Object.keys(letter).length; i += 1) {
      const currentKey = Object.keys(letter)[i];
      const currItem = letter[currentKey];
      hearts.unshift({ item: currItem, id: currentKey });
    }

    hearts.sort((obj1, obj2) => {
      const obj1Likes = obj1.item.likes !== undefined ? Object.keys(obj1.item.likes).length : 0;
      const obj2Likes = obj2.item.likes !== undefined ? Object.keys(obj2.item.likes).length : 0;
      return obj2Likes - obj1Likes;
    });

    this.setState({
      letters: newarrReverse, sortedByRecent: newarrReverse, sortedByOld: newarrOldFirst, sortedByHearts: hearts,
    });

    if (this.state.currentSort === 'OLD') {
      this.setState({ letters: newarrOldFirst });
    } else if (this.state.currentSort === 'NEW') {
      this.setState({ letters: newarrReverse });
    } else if (this.state.currentSort === 'HEARTS') {
      this.setState({ letters: hearts });
    }
  }

  sendLetter = (title, text) => {
    const date = this.getCurrentDate();
    document.body.style.overflow = 'unset';
    db.addLetter(text, title, this.state.username, date, this.state.userID);
    this.setState({ showCreateLetterInfo: false });
  }


  createLetter = () => {
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
    if (this.state.showCreateLetterInfo) {
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
      let letterObject = null;
      if (this.state.letters != null) {
        letterObject = Object.keys(this.state.letters).map((id) => {
          const info = this.state.letters[id];
          return (
            <OneLetter
              key={info.item.date}
              id={info.id}
              author={info.item.author}
              letter={info.item.letter}
              title={info.item.title}
              date={info.item.date}
            />
          );
        });
      }

      const createButton = this.state.showCreateLetterInfo ? null : (
        <div className="createLetterButtonContainer">
          <button onClick={this.createLetter} className="createButton" type="button">
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
            <DropDown shopDropDown={this.state.shopDropDown}
              currState={this.currentSort}
              sortedByOld={this.state.sortedByOld}
              sortedByHearts={this.state.sortedByHearts}
              sortedByRecent={this.state.sortedByRecent}
              calback={this.choseDropDrow}
            />
            <NewLetterModal onCloseAndSubmit={this.sendLetter} onClose={this.createLetter} show={this.state.showCreateLetterInfo} />
            <div style={{
              alignContent: 'center', justifyContent: 'center',
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
