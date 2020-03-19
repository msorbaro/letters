import React, { Component } from 'react';
import firebase from 'firebase';
import * as db from '../services/datastore';
import '../style.scss';


class OneComment extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, comment, likes, author
    this.state = {
      // authenticated: false,
      // username: '',
      userID: '',
      comment: this.props.comment,
      likes: 0,
      author: this.props.author,
      questionID: this.props.questionID,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.setState({ username: user.displayName });
        this.setState({ userID: user.uid });
        db.getLikes(this.props.id, this.updatedHeartCallBack);
      }
    });
  }

  commentNumUpdate = (likeNum) => {
    this.setState({ likes: likeNum });
  }

  likeComment = () => {
    // comment ID question ID
    db.likeComment(this.props.id, this.state.questionID, this.state.userID, this.commentNumUpdate);
  }

  unlikeComment = () => {
    db.unlikeComment(this.props.id, this.state.questionID, this.state.userID, this.commentNumUpdate);
  }

  render() {
    console.log(this.state.questionID);
    console.log(this.state.userID);
    return (
      <div style={{ }}>
        <div className="contentMain">
          <div>
            <p className="contentMainh1">
              {this.state.comment}
            </p>
          </div>
          <p>
            {' '}
Written by:
            {' '}
            {this.state.author}
            {' '}
          </p>
          <p>
            {' '}
              likes
            {this.state.likes}
            {' '}
          </p>
          <div>
            <button onClick={this.likeComment}
              type="button"
            >
              Like comment
            </button>
            <button onClick={this.unlikeComment}
              type="button"
            >
              Dislike comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OneComment;
