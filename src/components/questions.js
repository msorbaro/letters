import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as db from '../services/datastore';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { question: '' };
  }

  componentDidMount() {
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

  render() {
    return (
      <div style={{
        marginTop: 100, width: '100%', height: '100%',
      }}
      >
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

        <button onClick={this.addAComment}
          type="button"
        >
          Add A comment
        </button>
      </div>
    );
  }
}

export default withRouter((Questions));
