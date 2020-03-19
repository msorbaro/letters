import React, { Component } from 'react';
import firebase from 'firebase';
import * as db from '../services/datastore';
import '../style.scss';
import OneComment from './oneComment';

class OneQuestion extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, question, amount of agrees, amount of disagress, comments
    this.state = {
      // authenticated: false,
      // username: '',
      userID: '',
      question: this.props.question,
      agrees: 0,
      author: this.props.author,
      disagrees: 0,
      comments: this.props.comments,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
        db.getQuestionAgrees(this.props.id, this.updatedAgreeCallback);
        db.getQuestionDisagrees(this.props.id, this.updatedDisagreeCallback);
      }
    });
  }

  increaseQuestionLike = () => {
    db.increaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
  }

  increaseQuestionDislike = () => {
    db.increaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
  }

  decreaseQuestionLike = () => {
    db.decreaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
  }

  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
  }

  addAComment = () => {
    db.addComment('I am a test Commetn', this.props.id);
  }

  updatedAgreeCallback = (agreeNum) => {
    this.setState({ agrees: agreeNum });
  }

  updatedDisagreeCallback = (disagreeNum) => {
    this.setState({ disagrees: disagreeNum });
  }


  render() {
    let commentObject = null;
    if (this.state.comments != null && this.state.comments !== undefined) {
      commentObject = Object.keys(this.state.comments).map((id) => {
        const info = this.state.comments[id];
        return (
          // assuming gets props ID, comment, likes, author
          <OneComment
            id={id}
            author={info.author}
            comment={info.comment}
            questionID={this.props.id}
          />
        );
      });
    }
    return (
      <div style={{
        backgroundColor: 'white', width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em',
      }}
      >
        <div className="mainQuestion">
          <div className="heartAndCount">
            <div className="unlikedCount">
              {this.state.likes}
            </div>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <h1 className="h1Question">
              {' '}
              {this.state.question}
              {' '}
            </h1>
            <p>
              {' '}
Written by:
              {' '}
              {this.state.author}
              {' '}
            </p>
            <p className="bodyLikes">
              {' '}
              agrees
              {this.state.agrees}
              {' '}
            </p>
            <p className="boddyDislikes">
              {' '}
              disagrees
              {this.state.disagrees}
              {' '}
            </p>
            <p> comments </p>
            {commentObject}

            <div>
              <button onClick={this.increaseQuestionLike}
                type="button"
              >
              Increase Likes
              </button>
              <button onClick={this.increaseQuestionDislike}
                type="button"
              >
              Increase Dislikes
              </button>

              <button onClick={this.decreaseQuestionLike}
                type="button"
              >
              Decrease Likes
              </button>
              <button onClick={this.decreaseQuestionDislike}
                type="button"
              >
              Decrease Dislikes
              </button>
            </div>

            <button onClick={this.addAComment}
              type="button"
            >
              Add A comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OneQuestion;