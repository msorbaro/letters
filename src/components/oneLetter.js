import React, { Component } from 'react';
import firebase from 'firebase';
import * as db from '../services/datastore';
import '../style.scss';


class OneLetter extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, letter, amount of likes, title
    this.state = {
      // authenticated: false,
      // username: '',
      userID: '',
      title: this.props.title,
      letter: this.props.letter,
      likes: 0,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
      }
    });
  }

  updateHeartsIncrease = () => {
    db.increaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
  }

  updatedHeartCallBack = (newState) => {
    this.setState({ likes: newState });
  }


  render() {
    return (
      <div style={{
        backgroundColor: 'white', width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em',
      }}
      >
        <div className="smallDiv" />
        <div className="mainLetter">
          <div className="unliked" />
          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <h1 className="h1Letter">
              {' '}
              {this.state.title}
              {' '}
            </h1>
            <p className="bodyLetter">
              {' '}
              {this.state.letter}
              {' '}
            </p>
            <p>
              {' '}
likes:
              {this.state.likes}
              {' '}

            </p>
            <p>
              {' '}
ID:
              {this.props.id}
            </p>
          </div>
        </div>

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

export default OneLetter;