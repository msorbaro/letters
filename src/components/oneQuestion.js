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
      agrees: this.props.agrees,
      author: this.props.author,
      disagrees: this.props.disagrees,
      comments: this.props.comments,
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

  increaseQuestionLike = () => {
    db.increaseQuestionYes(this.props.id, this.rogueCallBack);
    this.setState(prevState => ({ agrees: prevState.agrees + 1 }));
  }

  increaseQuestionDislike = () => {
    db.increaseQuestionNo(this.props.id, this.rogueCallBack);
    this.setState(prevState => ({ disagrees: prevState.disagrees + 1 }));
  }

  decreaseQuestionLike = () => {
    db.decreaseQuestionYes(this.props.id, this.rogueCallBack);
    this.setState(prevState => ({ agrees: prevState.agrees - 1 }));
  }

  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo(this.props.id, this.rogueCallBack);
    this.setState(prevState => ({ disagrees: prevState.disagrees - 1 }));
  }

  addAComment = () => {
    db.addComment('I am a test Commetn', this.props.id);
  }


  render() {
    console.log(this.state.userID);
    let commentObject = null;
    if (this.state.comments != null && this.state.comments !== undefined) {
      commentObject = Object.keys(this.state.comments).map((id) => {
        console.log(id);
        const info = this.state.comments[id];
        console.log(info);
        return (
          // assuming gets props ID, comment, likes, author
          <OneComment
            id={id}
            author={info.author}
            comment={info.comment}
            likes={info.likes}
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
