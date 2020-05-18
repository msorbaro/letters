import React, { Component } from 'react';
import firebase from 'firebase';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import OneComment from './oneComment';
import * as db from '../services/datastore';

/*
This component holds all the information for one question
This information includes who wrote the question, amount of likes it has, and comments associated with it.
*/
class OneQuestion extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, question, amount of agrees, amount of disagress, comments
    this.state = {
      userID: '',
      question: this.props.question,
      authorID: this.props.authorID,
      author: this.props.author,
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

  // before the component loads we need to get all the information about the users and the question
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

  // this calculates the current date for posting a question
  getCurrentDate = (separator = '/') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minute = newDate.getMinutes();

    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}${' '}${hours}${':'}${minute}`;
  }

  // this increases the YES votes for a question in the back end
  increaseQuestionLike = () => {
    db.increaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
    this.setState({ haveAgreed: true });
    if (this.state.haveDisagreed) {
      this.decreaseQuestionDislike();
    }
  }

  // this increases the NO votes for a function in the backend
  increaseQuestionDislike = () => {
    db.increaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: true });
    if (this.state.haveAgreed) {
      this.decreaseQuestionLike();
    }
  }

  // this decreases the YES votes in the backend
  decreaseQuestionLike = () => {
    db.decreaseQuestionYes(this.props.id, this.state.userID, this.updatedAgreeCallback);
    this.setState({ haveAgreed: false });
  }

  // This decreases the no votes in the backend for this question
  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo(this.props.id, this.state.userID, this.updatedDisagreeCallback);
    this.setState({ haveDisagreed: false });
  }

  // This changes the state for a new style for adding a comment
  createNewComment = () => {
    this.setState({ createNewComment: true });
  }

  // this updates the amount of agree numbers
  updatedAgreeCallback = (agreeNum) => {
    this.setState({ agrees: agreeNum });
  }

  // this allows the user to add a comment
  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  // this updates the number of disagree votes
  updatedDisagreeCallback = (disagreeNum) => {
    this.setState({ disagrees: disagreeNum });
  }

  // This handles the click by a user to like a question
  handleUpThumbClick = () => {
    if (this.state.haveAgreed) {
      this.decreaseQuestionLike();
    } else {
      this.increaseQuestionLike();
    }
  }

  // this handles click by user to dislike a question
  handleDownThumbClick = () => {
    if (this.state.haveDisagreed) {
      this.decreaseQuestionDislike();
    } else {
      this.increaseQuestionDislike();
    }
  }

  // this shows that you have marked the question yes
  showRightUpThumb = () => {
    if (this.state.haveAgreed) {
      return (<div className="upThumbColor" />);
    } else {
      return (<div className="upThumbTransparent" />);
    }
  }

  // this shows if you have marked the question no
  showRightDownThumb = () => {
    if (this.state.haveDisagreed) {
      return (<div className="downThumbColor" />);
    } else {
      return (<div className="downThumbTransparent" />);
    }
  }

  // changes variables for liked
  upThumbCallback = (clicked) => {
    if (clicked === 0) {
      this.setState({ haveAgreed: false });
    } else if (clicked === 1) {
      this.setState({ haveAgreed: true });
    }
  }

  // changes varaibles for disliked
  downThumbCallback = (clicked) => {
    if (clicked === 0) {
      this.setState({ haveDisagreed: false });
    } else if (clicked === 1) {
      this.setState({ haveDisagreed: true });
    }
  }

  // updates to get new comments from database
  refreshComments = (updatedComments) => {
    this.setState({ comments: updatedComments });
  }

  // sends a new comment to the database
  sendComment = () => {
    const date = this.getCurrentDate();
    db.addComment(this.state.comment, this.state.username, this.state.userID, this.props.id, date, this.refreshComments);
    this.setState({ comment: '', createNewComment: false });
  }

  // lets a user decide not to post their comment
  cancel = () => {
    this.setState({ comment: '', createNewComment: false });
  }

  // lets a user see more comments
  viewMore = () => {
    this.setState(prevState => ({ numberToView: prevState.numberToView + 3 }));
  }


  // deletes a question from the database
  deleteQuestion = () => {
    db.deleteQuestion(this.props.id);
  }

  // shows a delete button only if the user is the one who wrote the question
  showDelete = () => {
    if (this.state.userID === this.state.authorID || this.state.userID === 'AVlLfxZZ0eZRj6hcowxNgy0Qtir2' || this.state.userID === 'uNzNPFZkAPbVKvYt9iI61FaXT4R2') {
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

    // make comment objects for all of the comments with this question.
    // update Z index for nice stacking display
    let commentObject = null;
    if (this.state.comments != null && this.state.comments !== undefined) {
      let zIndex = 999;
      let count = 0;
      commentObject = Object.keys(this.state.comments).map((id, index) => {
        const info = this.state.comments[id];
        zIndex -= 5;
        count += 1;
        if (count <= this.state.numberToView) {
          return (
            <div>
              <OneComment
                zIndex={zIndex}
                id={id}
                key={id}
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

    // decides whether there should be a show more comments button, whether or not more comments exist
    const size = this.state.comments !== undefined ? Object.keys(this.state.comments).length : 0;
    const showMoreOrNah = size < 3 || this.state.numberToView >= size;
    const showMore = showMoreOrNah ? null
      : (
        <div className="addCommentPus" onClick={this.viewMore} role="button" tabIndex={0}>
          <FontAwesomeIcon className="testtestTwo" icon={faChevronDown} style={{ color: '#6F6F6F' }} />
        </div>
      );

    const classNamee = showMoreOrNah ? 'noMoreToShow' : 'moreToShow';

   // What the bottom bar should look like if the user is not commenting
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

    // what the bottom bar should look like if the user is commenting
    const commentingCurrently = (
      <div className="contentMainTakeThree">
        <textarea style={{ width: '90%', marginTop: 20, height: '7.5vh' }} type="text" value={this.state.comment} onChange={this.handleCommentChange} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button type="button"
            className="whiteButton commentcommentbutton"
            onClick={this.cancel}
          >
            {' '}
            Cancel
            {' '}
          </button>
          <button type="button"
            style={{ borderColor: '#F7F7F7' }}
            className="greenButton commentcommentbutton"
            onClick={this.sendComment}
          >
            {' '}
            Submit
            {' '}
          </button>
        </div>
      </div>
    );


    // deciding which box to show
    let commentToDisplay = null;
    if (this.state.createNewComment) {
      commentToDisplay = commentingCurrently;
    } else {
      commentToDisplay = underCommentPromptToAdd;
    }


    const styleChoice = this.state.comments !== undefined ? 'outerStyle' : 'outerStyleTwo';
    return (
      <div>
        <div className="backgroundcoloroffwhite">
          <div className="smallDiv" />
          <div style={{
            marginLeft: 10, marginRight: 10, height: '100%',
          }}
            className="mainQuestion"
          >
            <div className="alignthumbs">
              <div className="questAndAuth">
                <h1 className="h1Question">
                  {' '}
                  {this.state.question}
                  {' '}
                </h1>
                <div className="questionAuth">
                  {' '}
                  Written by:
                  {' '}
                  {this.state.author}
                  {' '}
                </div>
                <div>
                  {' '}
                  {this.showDelete()}
                </div>
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
          <div>
            {commentToDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default OneQuestion;
