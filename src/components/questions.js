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

  rogueCallBack = () => {
    console.log('callback');
  }

  increaseQuestionLike = () => {
    db.increaseQuestionYes('-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
  }

  increaseQuestionDislike = () => {
    db.increaseQuestionNo('-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
  }

  decreaseQuestionLike = () => {
    db.decreaseQuestionYes('-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
  }

  decreaseQuestionDislike = () => {
    db.decreaseQuestionNo('-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
  }

  addAComment = () => {
    db.addComment('I am a comment', '-M2jQxka2erZ58z2Yo1M');
  }

  likeComment = () => {
    db.likeComment('-M2j_Fs_4RnF_lG50kYV', '-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
  }

  dislikeComment = () => {
    db.dislikeComment('-M2j_Fs_4RnF_lG50kYV', '-M2jQxka2erZ58z2Yo1M', this.rogueCallBack);
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
        marginTop: 100, width: '100%', height: '100%',
      }}
      >
        {questionObject}
        <div>
          <input type="text" value={this.state.question} onChange={this.handleQuestionChange} />
          <button onClick={this.submitQuestion}
            type="button"
          >
          Send Test Letter
          </button>

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
    );
  }
}

export default withRouter((Questions));
