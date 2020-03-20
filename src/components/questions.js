import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as db from '../services/datastore';
import OneQuestion from './OneQuestion';
import NewQuestionModal from './newQuestionModal';
import '../style.scss';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: {}, showCreateLetterInfo: false };
  }

  componentDidMount() {
    db.getQuesions(this.recievedQuestions);
  }

  recievedQuestions = (questions) => {
  //  console.log(letter);
    this.setState({ questions });
  }

  sendQuestion = (question) => {
    db.addQuestion(question);
    this.setState({ showCreateLetterInfo: false });
  }

  createQuestion = () => {
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
  }

  render() {
    let questionObject = null;
    if (this.state.questions != null) {
      questionObject = Object.keys(this.state.questions).map((id) => {
        console.log(id);
        const info = this.state.questions[id];
        console.log(info);
        return (
          // assuming gets props ID, question, amount of agrees, amount of disagress, comments
          <OneQuestion
            id={id}
            author={info.author}
            question={info.question}
            agrees={info.agrees}
            disagrees={info.disagrees}
            comments={info.Comments}
          />
        );
      });
    }


    const createButton = (
      <div className="createLetterButtonContainer">
        <button onClick={this.createQuestion}
          type="button"
        >
          <div className="penIcon" />
            Add a Poll
        </button>
      </div>
    );
    return (
      <div style={{
        displey: 'flex', 'align-content': 'center', justifyContent: 'center', 'justify-content': 'center',
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
