/* eslint react/no-array-index-key: 0 */
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
      authorID: this.props.authorID,
      date: this.props.date,
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

  handleButtonClick = () => {
    if (this.state.haveLiked) {
      this.updateHeartsDecrease();
    } else {
      this.updateHeartsIncrease();
    }
  }

  updateHeartsIncrease = () => {
    db.increaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
    this.setState({ haveLiked: true });
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore(this.props.id, this.state.userID, this.updatedHeartCallBack);
    this.setState({ haveLiked: false });
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

  deleteLetter = () => {
    db.deleteLetter(this.props.id);
  }

  showDelete = () => {
    if (this.state.userID === this.state.authorID || this.state.userID === 'AVlLfxZZ0eZRj6hcowxNgy0Qtir2' || this.state.userID === 'uNzNPFZkAPbVKvYt9iI61FaXT4R2') {
      return (
        <button type="button"
          className="deletion"
          onClick={this.deleteLetter}
        >
          Delete
        </button>
      );
    } else {
      return null;
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
    const letterSnippits = this.state.letter.split('\n');
    const finalLetter = letterSnippits.map((id, index) => {
      return (
        <p className="bodyLetter" key={index}>
          {' '}
          {id}
          {' '}
        </p>
      );
    });

    return (
      <div className="letterOuterMainStyle">
        <div className="smallDiv" />
        <div className="mainLetter">
          <div className="heartAndCount">
            <button type="button" className="invisibleButton" onClick={this.handleButtonClick}>
              {this.showRightHeart()}
            </button>
            <div className="unlikedCount">
              {this.state.likes}
            </div>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10, width: '100%' }}>
            <div className="letterStyl">
              <h1 className="h1Letter">
                {' '}
                {this.state.title}
                {' '}
              </h1>
              <div style={{
                marginRight: '20px', display: 'flex', flexDirection: 'column', height: '100%',
              }}
              >
                {this.showDelete()}
                <p className="letterP">
                  {' '}
                  Written by:
                  {' '}
                  {this.state.author}
                  {' '}
                </p>

                <p className="letterP">
                  {' '}
                  Date:
                  {' '}
                  {this.state.date}
                  {' '}
                </p>
              </div>
            </div>
            <div className="addSomeMobilePadding">
              {finalLetter}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OneLetter;
