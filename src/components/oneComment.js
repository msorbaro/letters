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
      author: this.props.author,
      authorID: this.props.authorID,
      questionID: this.props.questionID,
      likes: 0,
      haveLiked: false,
      date: this.props.date,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        db.getCommentLikes(this.state.questionID, this.props.id, this.commentNumUpdate);
        db.getCommentStatus(this.state.questionID, this.props.id, this.state.userID, this.commentUpdateStatus);
      }
    });
  }

  commentNumUpdate = (likeNum) => {
    this.setState({ likes: likeNum });
  }

  commentUpdateStatus = (likeNum) => {
    if (likeNum === 1) {
      this.setState({ haveLiked: true });
    } else if (likeNum === 0) {
      this.setState({ haveLiked: false });
    }
  }

  likeComment = () => {
    db.likeComment(this.props.id, this.state.questionID, this.state.userID, this.commentNumUpdate);
    this.setState({ haveLiked: true });
  }

  unlikeComment = () => {
    db.unlikeComment(this.props.id, this.state.questionID, this.state.userID, this.commentNumUpdate);
    this.setState({ haveLiked: false });
  }

  handleButtonClick = () => {
    if (this.state.haveLiked) {
      this.unlikeComment();
    } else {
      this.likeComment();
    }
  }

  showRightHeart = () => {
    if (this.state.haveLiked) {
      return (<div className="smallerLiked" />);
    } else {
      return (<div className="smallerUnliked" />);
    }
  }

  deleteComment = () => {
    db.deleteComment(this.state.questionID, this.props.id);
    this.setState({ authorID: 'gone' });
  }

  showDelete = () => {
    if (this.state.userID === this.state.authorID) {
      return (
        <button type="button"
          className="commentDeletion"
          onClick={this.deleteComment}
        >
          Delete
        </button>
      );
    } else {
      return null;
    }
  }

  render() {
    const { zIndex } = this.props;
    return (
      <div style={{ zIndex: 1 * zIndex, position: 'relative' }}>
        <div className="contentMain">
          <div className="getLikesAlignedWithText">
            <div className="contantContainerTakeTwo">
              <div className="h1ContainerConent">
                <p className="contentMainh1">
                  {this.state.comment}
                </p>
              </div>
              <p className="author">
                Written by:
                {' '}
                {' '}
                {this.state.author}
              </p>
              <p className="author">
                Date:
                {' '}
                {' '}
                {this.state.date}
              </p>
              <div>{this.showDelete()}</div>
            </div>
            <div className="heartAndCount">
              <button type="button" className="invisibleButton" onClick={this.handleButtonClick}>
                {this.showRightHeart()}
              </button>
              <div className="unlikedCount">
                {this.state.likes}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OneComment;
