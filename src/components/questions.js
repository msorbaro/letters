import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as db from '../services/datastore';
import OneQuestion from './OneQuestion';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: {} };
  }

  componentDidMount() {
    db.getQuesions(this.recievedQuestions);
  }

  recievedQuestions = (questions) => {
  //  console.log(letter);
    this.setState({ questions });
  }

  handleQuestionChange = (event) => {
    this.setState({ question: event.target.value });
  }

  submitQuestion = () => {
    db.addQuestion(this.state.question);
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

    return (
      <div style={{
        displey: 'flex', 'align-content': 'center', justifyContent: 'center', 'justify-content': 'center',
      }}
        className="tryingToCenter"
      >
        {questionObject}
        <div>
          <input type="text" value={this.state.question} onChange={this.handleQuestionChange} />
          <button onClick={this.submitQuestion}
            type="button"
          >
          Send Test Question
          </button>

        </div>
      </div>
    );
  }
}

export default withRouter((Questions));
