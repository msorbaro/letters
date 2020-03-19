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
      likes: this.props.likes,
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

  rogueCallBack = () => {
    console.log('callback');
  }

  likeComment = () => {
    // comment ID question ID
    db.likeComment(this.props.id, this.state.questionID, this.rogueCallBack);
    this.setState(prevState => ({ likes: prevState.likes + 1 }));
  }

  dislikeComment = () => {
    db.dislikeComment(this.props.id, this.state.questionID, this.rogueCallBack);
    this.setState(prevState => ({ likes: prevState.likes - 1 }));
  }

  render() {
    console.log(this.state.questionID);
    console.log(this.state.userID);
    return (
      <div style={{
        backgroundColor: 'white', width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em',
      }}
      >
        <div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <h1>
              {' '}
              {this.state.comment}
              {' '}
            </h1>
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
              <button onClick={this.dislikeComment}
                type="button"
              >
              Dislike comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OneComment;
