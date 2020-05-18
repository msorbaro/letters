import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import * as db from '../services/datastore';
import OneQuestion from './OneQuestion';
import NewQuestionModal from './newQuestionModal';
import '../style.scss';

/*
This component stores all the information about the questions
It displays all the questions from the database and acts as a container for them
*/
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {}, showCreateLetterInfo: false, userID: '', username: '',
    };
  }

  // before the page is loaded we get all the questions from the database
  // we also must get who the current user logged in is
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        this.setState({ username: user.displayName });
      }
    });
    db.getQuesions(this.recievedQuestions);
  }

  // this sets our component to have the questions from the database
  recievedQuestions = (questions) => {
    this.setState({ questions });
  }

  // This allows a user to add a question and pushes the question to the database
  sendQuestion = (question) => {
    document.body.style.overflow = 'unset';
    db.addQuestion(question, this.state.userID, this.state.username);
    this.setState({ showCreateLetterInfo: false });
  }

  // This allows a user to see the modal that allows them to create a question
  createQuestion = () => {
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
    if (this.state.showCreateLetterInfo) {
      document.body.style.overflow = 'unset';
    }
  }

  render() {
    let questionObject = null;
    if (this.state.questions != null) {
      // Here we get all the questions from the state, and make them into Question Components
      questionObject = Object.keys(this.state.questions).map((id) => {
        const info = this.state.questions[id];
        return (
          // assuming gets props ID, question, amount of agrees, amount of disagress, comments
          <OneQuestion
            key={id}
            id={id}
            author={info.author}
            authorID={info.authorID}
            question={info.question}
            agrees={info.agrees}
            disagrees={info.disagrees}
            comments={info.Comments}
          />
        );
      });
    }

    // This button is for adding a question
    const createButton = (
      <div className="createLetterButtonContainer">
        <button onClick={this.createQuestion}
          type="button"
          className="pollButton"
        >
          <a href="#top">
            <div className="penIcon" />
            Add a Poll
          </a>

        </button>
      </div>
    );
    
    return (
      <div style={{
        alignContent: 'center', justifyContent: 'center', marginBottom: 30,
      }}
        className="tryingToCenter"
      >
        <div style={{ zIndex: 5 }}>
          <NewQuestionModal onCloseAndSubmit={this.sendQuestion} onClose={this.createQuestion} show={this.state.showCreateLetterInfo} />
        </div>
        {questionObject}
        {createButton}
      </div>
    );
  }
}

export default withRouter((Questions));
