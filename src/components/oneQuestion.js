import React, { Component } from 'react';
import firebase from 'firebase';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import OneComment from './oneComment';
import * as db from '../services/datastore';


class OneQuestion extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, question, amount of agrees, amount of disagress, comments
    this.state = {
      userID: '',
      question: this.props.question,
      authorID: this.props.authorID,
      agrees: 0,
      username: '',
      disagrees: 0,
      comments: this.props.comments,
      haveAgreed: false,
      haveDisagreed: false,
      comment: '',
      createNewComment: false,
      numberToView: 3,
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
    if (this.state.haveDisagreed) {
      this.decreaseQuestionDislike();
    }
  }

  increaseQuestionDislike = () => {
    db.increaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: true });
    if (this.state.haveAgreed) {
      this.decreaseQuestionLike();
    }
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
    //     if (this.state.haveAgreed) {
    //       return (
    //         <p className="selectedStyle"
    //           style={{
    //             backgroundColor: '#00ac66', borderColor: '#00ac66', color: 'white', fontSize: '15px', width: '20px',
    //           }}
    //         >
    // Yes
    //           {' '}
    //         </p>
    //       );
    //     } else {
    //       return (<p className="notSelected" style={{ color: '#00ac66', fontSize: '15px', width: '20px' }}>Yes </p>);
    //     }
  }

  showRightDownThumb = () => {
    if (this.state.haveDisagreed) {
      return (<div className="downThumbColor" />);
    } else {
      return (<div className="downThumbTransparent" />);
    }

    //     if (this.state.haveDisagreed) {
    //       return (
    //         <p className="selectedStyle"
    //           style={{
    //             backgroundColor: '#f51818', borderColor: '#f51818', color: 'white', fontSize: '15px', width: '17px',
    //           }}
    //         >
    //           {' '}
    // No
    //           {' '}
    //         </p>
    //       );
    //     } else {
    //       return (<p className="notSelected" style={{ color: '#f51818', fontSize: '15px', width: '17px' }}> No </p>);
    //     }
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

  refreshComments = (updatedComments) => {
    this.setState({ comments: updatedComments });
  }

  sendComment = () => {
    const date = this.getCurrentDate();
    db.addComment(this.state.comment, this.state.username, this.state.userID, this.props.id, date, this.refreshComments);
    this.setState({ comment: '', createNewComment: false });
  }

  cancel = () => {
    this.setState({ comment: '', createNewComment: false });
  }

  viewMore = () => {
    this.setState(prevState => ({ numberToView: prevState.numberToView + 3 }));
  }

  deleteQuestion = () => {
    db.deleteQuestion(this.props.id);
  }

  showDelete = () => {
    if (this.state.userID === this.state.authorID) {
      return (
        <button type="button"
          className="questDeletion"
          onClick={this.deleteQuestion}
        >
          Delete
        </button>
      );
    } else {
      return null;
    }
  }

  render() {
    let commentObject = null;
    if (this.state.comments != null && this.state.comments !== undefined) {
      let zIndex = 999;
      let count = 0;
      commentObject = Object.keys(this.state.comments).map((id) => {
        const info = this.state.comments[id];
        zIndex -= 5;
        //  const newZ = String(zIndex);
        count += 1;
        if (count <= this.state.numberToView) {
          return (
          // assuming gets props ID, comment, likes, author
            <div>
              <OneComment
                zIndex={zIndex}
                id={id}
                author={info.author}
                authorID={info.authorID}
                comment={info.comment}
                questionID={this.props.id}
                date={info.date}
              />
            </div>
          );
        }
        return null;
      });
    }

    const size = this.state.comments !== undefined ? Object.keys(this.state.comments).length : 0;
    const showMoreOrNah = size < 3 || this.state.numberToView >= size;
    const showMore = showMoreOrNah ? null
      : (
        <div className="addCommentPus" onClick={this.viewMore} role="button" tabIndex={0}>
          <FontAwesomeIcon className="testtestTwo" icon={faChevronDown} style={{ color: '#6F6F6F' }} />
        </div>
      );

    const classNamee = showMoreOrNah ? 'noMoreToShow' : 'moreToShow';

    const underCommentPromptToAdd = (
      <div className="contentMainTakeTwo">
        <div style={{
          marginTop: 15, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end',
        }}
        >
          <div className={classNamee}>
            {showMore}
            <div className="addCommentPus"
              onClick={this.createNewComment}
              role="button"
              tabIndex={0}
              style={{
                marginRight: '10px', display: 'flex', justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon className="testtestTwo" icon={faPlus} style={{ color: '#6F6F6F' }} />
              <p className="colorGray">
                Add a Comment
              </p>
            </div>
          </div>

        </div>
      </div>
    );


    const commentingCurrently = (
      <div className="contentMainTakeThree">
        <textarea style={{ width: '90%', marginTop: 20, height: '7.5vh' }} type="text" value={this.state.comment} onChange={this.handleCommentChange} />
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

    // const filledRed = this.state.haveDisagreed ? 'filledRed' : 'thumbAndCount';
    //  const filledGreen = this.state.haveAgreed ? 'filledGreen' : 'thumbAndCount';

    // const agreeColorText = this.state.haveAgreed ? 'white' : '#00ac66';
    // const disagreeColorText = this.state.haveDisagreed ? 'white' : '#f51818';

    const styleChoice = this.state.comments !== undefined ? 'outerStyle' : 'outerStyleTwo';
    return (
      <div>
        <div className="backgroundcoloroffwhite"
          style={{
            width: '60vw', marginTop: 10, marginBottom: 10, borderRadius: '1em', zIndex: 1, position: 'relative',
          }}
        >
          <div className="smallDiv" />
          <div style={{
            marginLeft: 10, marginRight: 10, height: '100%',
          }}
            className="mainQuestion"
          >
            <div className="alignthumbs">
              <h1 className="h1Question">
                {' '}
                {this.state.question}
                {' '}
              </h1>
              <div>
                {' '}
                {this.showDelete()}
              </div>
              <div className="containerthumbs">
                <div className="thumbAndCount">
                  <button type="button" className="invisibleThumbButton" onClick={this.handleUpThumbClick}>
                    { this.showRightUpThumb()}
                  </button>
                  <div className="agreeCount"
                    style={{ color: '#00693E' }}
                  >
                    {' '}

                  Y (
                    {this.state.agrees}
)
                  </div>
                </div>
                <div className="thumbAndCount">
                  <button type="button" className="invisibleThumbButton" onClick={this.handleDownThumbClick}>
                    {this.showRightDownThumb()}
                  </button>
                  <div className="disagreeCount" style={{ color: '#690000' }}>
                  N (
                    {this.state.disagrees}
                    {''}
)
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
