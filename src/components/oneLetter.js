import React, { Component } from 'react';
import * as db from '../services/datastore';


class OneLetter extends Component {
  constructor(props) {
    super(props);

    // assuming gets props ID, letter, amount of likes, title
    this.state = { title: this.props.title, letter: this.props.letter, likes: this.props.likes };
  }

  componentDidMount() {
  }

  updateHeartsIncrease = () => {
    db.increaseLetterScore(this.props.id, this.updatedHeartCallBack);
  }

  updateHeartsDecrease = () => {
    db.decreaseLetterScore(this.props.id, this.updatedHeartCallBack);
  }

  updatedHeartCallBack = (newState) => {
    console.log(newState);
    this.setState({ likes: newState });
  }


  render() {
    return (
      <div>
        <h1>
          {' '}
          {this.state.title}
          {' '}
        </h1>
        <p>
          {' '}
          {this.state.letter}
          {' '}
        </p>
        <p>
          {' '}
likes:
          {this.state.likes}
          {' '}

        </p>
        <p>
          {' '}
ID:
          {this.props.id}
        </p>

        <button onClick={this.updateHeartsIncrease}
          type="button"
        >
        Update Letter Hearts Increase
        </button>
        <button onClick={this.updateHeartsDecrease}
          type="button"
        >
        Update Letter Hearts Decrease
        </button>
      </div>
    );
  }
}

export default OneLetter;
