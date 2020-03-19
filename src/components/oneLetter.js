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
      author: this.props.author,
      likes: 0,
      haveLiked: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
        db.getLikes(this.props.id, this.updatedHeartCallBack);
        db.getLikeStatus(this.props.id, this.state.userID, this.likeStatusCallback);
      }
    });
  }

  updateHeartsIncrease = () => {
    db.increaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
    this.setState({ haveLiked: true });
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
    this.setState({ haveLiked: false });
    console.log(this.state.haveLiked);
  }

  updatedHeartCallBack = (likeNum) => {
    this.setState({ likes: likeNum });
  }

  likeStatusCallback = (liked) => {
    if (liked === 0) {
      this.setState({ haveLiked: false });
    } else if (liked === 1) {
      this.setState({ haveLiked: true });
    }
  }

  showRightHeart = () => {
    if (this.state.haveLiked) {
      return (<div className="liked" />);
    } else {
      return (<div className="unliked" />);
    }
  }


  render() {
    return (
      <div style={{
        backgroundColor: 'white', width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em',
      }}
      >
        <div className="smallDiv" />
        <div className="mainLetter">
          <div className="heartAndCount">
            {this.showRightHeart()}
            <div className="unlikedCount">
              {this.state.likes}
            </div>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <h1 className="h1Letter">
              {' '}
              {this.state.title}
              {' '}
            </h1>
            <p>
              {' '}
Written by:
              {' '}
              {this.state.author}
              {' '}
            </p>
            <p className="bodyLetter">
              {' '}
              {this.state.letter}
              {' '}
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
