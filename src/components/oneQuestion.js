import React, { Component } from 'react';
import firebase from 'firebase';
import '../style.scss';
import OneComment from './oneComment';
import * as db from '../services/datastore';


class OneQuestion extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, question, amount of agrees, amount of disagress, comments
    this.state = {
      userID: '',
      question: this.props.question,
      agrees: 0,
      // author: this.props.author,
      disagrees: 0,
      comments: this.props.comments,
      haveAgreed: false,
      haveDisagreed: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        db.getQuestionAgrees(this.props.id, this.updatedAgreeCallback);
        db.getQuestionDisagrees(this.props.id, this.updatedDisagreeCallback);
        db.getYourQuestionAgrees(this.props.id, this.state.userID, this.upThumbCallback);
        db.getYourQuestionDisagrees(this.props.id, this.state.userID, this.downThumbCallback);
      }
    });
  }

  increaseQuestionLike = () => {
    db.increaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
    this.setState({ haveAgreed: true });
  }

  increaseQuestionDislike = () => {
    db.increaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: true });
  }

  decreaseQuestionLike = () => {
    db.decreaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
    this.setState({ haveDisagreed: false });
  }

  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: false });
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

  handleUpThumbClick = () => {
    if (this.state.haveAgreed) {
      this.decreaseQuestionLike();
    } else {
      this.increaseQuestionLike();
    }
  }

  handleDownThumbClick = () => {
    if (this.state.haveDisagreed) {
      this.decreaseQuestionDislike();
    } else {
      this.increaseQuestionDislike();
    }
  }

  showRightUpThumb = () => {
    if (this.state.haveAgreed) {
      return (<div className="upThumbColor" />);
    } else {
      return (<div className="upThumbTransparent" />);
    }
  }

  showRightDownThumb = () => {
    if (this.state.haveDisagreed) {
      return (<div className="downThumbColor" />);
    } else {
      return (<div className="downThumbTransparent" />);
    }
  }

  upThumbCallback = (clicked) => {
    if (clicked === 0) {
      this.setState({ haveAgreed: false });
    } else if (clicked === 1) {
      this.setState({ haveAgreed: true });
    }
  }

  downThumbCallback = (clicked) => {
    if (clicked === 0) {
      this.setState({ haveDisagreed: false });
    } else if (clicked === 1) {
      this.setState({ haveDisagreed: true });
    }
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
      <div>
        <div className="backgroundcoloroffwhite"
          style={{
            width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em',
          }}
        >
          <div className="smallDiv" />
          <div style={{ marginLeft: 10, marginRight: 10 }} className="mainQuestion">
            <div className="alignthumbs">
              <h1 className="h1Question">
                {' '}
                {this.state.question}
                {' '}
              </h1>
              <div className="containerthumbs">
                <div className="thumbAndCount">
                  <button type="button" className="invisibleThumbButton" onClick={this.handleUpThumbClick}>
                    {this.showRightUpThumb()}
                  </button>
                  <div className="agreeCount">
                    {this.state.agrees}
                  </div>
                </div>
                <div className="thumbAndCount">
                  <button type="button" className="invisibleThumbButton" onClick={this.handleDownThumbClick}>
                    {this.showRightDownThumb()}
                  </button>
                  <div className="disagreeCount">
                    {this.state.disagrees}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={this.addAComment}
            type="button"
          >
                Add A comment
          </button>
        </div>

        <div style={{ marginLeft: 30, marginTop: -20 }}>
          {commentObject}
        </div>


      </div>
    );
  }
}

export default OneQuestion;
