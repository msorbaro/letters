import React, { Component } from 'react';
import firebase from 'firebase';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
      username: '',
      disagrees: 0,
      comments: this.props.comments,
      haveAgreed: false,
      haveDisagreed: false,
      comment: '',
      createNewComment: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        this.setState({ username: user.displayName });
        db.getQuestionAgrees(this.props.id, this.updatedAgreeCallback);
        db.getQuestionDisagrees(this.props.id, this.updatedDisagreeCallback);
        db.getYourQuestionAgrees(this.props.id, this.state.userID, this.upThumbCallback);
        db.getYourQuestionDisagrees(this.props.id, this.state.userID, this.downThumbCallback);
      }
    });
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
    this.setState({ haveAgreed: false });
  }

  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: false });
  }

  createNewComment = () => {
    this.setState({ createNewComment: true });
  }

  addAComment = () => {
    const date = this.getCurrentDate();
    db.addComment('I am a test Commetn', this.state.username, this.props.id, date);
  }

  updatedAgreeCallback = (agreeNum) => {
    this.setState({ agrees: agreeNum });
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
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

  sendComment = () => {
    const date = this.getCurrentDate();
    db.addComment(this.state.comment, this.props.id, date);
    this.setState({ comment: '', createNewComment: false });
  }

  cancel = () => {
    this.setState({ comment: '', createNewComment: false });
  }

  render() {
    let commentObject = null;
    if (this.state.comments != null && this.state.comments !== undefined) {
      let zIndex = 999;
      commentObject = Object.keys(this.state.comments).map((id) => {
        const info = this.state.comments[id];
        zIndex -= 5;
        //  const newZ = String(zIndex);

        return (
          // assuming gets props ID, comment, likes, author
          <div>
            <OneComment
              zIndex={zIndex}
              id={id}
              author={info.author}
              comment={info.comment}
              questionID={this.props.id}
              date={info.date}
            />
          </div>
        );
      });
    }

    const underCommentPromptToAdd = (
      <div className="contentMainTakeTwo">
        <div style={{
          marginTop: 15,
        }}
        >
          <div className="addCommentPus" onClick={this.createNewComment} role="button" tabIndex={0}>
            <FontAwesomeIcon className="testtestTwo" icon={faPlus} />
            <p className="colorGray">
            Add a Comment!
            </p>
          </div>
        </div>
      </div>
    );


    const commentingCurrently = (
      <div className="contentMainTakeThree">
        <textarea style={{ width: '90%', marginTop: 15, height: '8vh' }} type="text" value={this.state.comment} onChange={this.handleCommentChange} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button type="button"
            style={{
              height: '3vh', width: '6vw', fontSize: '.75em', borderWidth: '1px', marginTop: '2px',
            }}
            className="whiteButton"
            onClick={this.cancel}
          >
            {' '}
      Cancel
            {' '}
          </button>
          <button type="button"
            style={{
              height: '3vh', width: '6vw', fontSize: '.75em', borderWidth: '1px', borderColor: '#F7F7F7', marginTop: '2px',
            }}
            className="greenButton"
            onClick={this.sendComment}
          >
            {' '}
      Submit
            {' '}
          </button>
        </div>
      </div>
    );


    let commentToDisplay = null;
    if (this.state.createNewComment) {
      commentToDisplay = commentingCurrently;
    } else {
      commentToDisplay = underCommentPromptToAdd;
    }

    const styleChoice = this.state.comments !== undefined ? 'outerStyle' : 'outerStyleTwo';
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
        </div>

        <div className={styleChoice}>
          <div className="innerStyle">
            {commentObject}
          </div>
          {commentToDisplay}
        </div>
      </div>
    );
  }
}

export default OneQuestion;
