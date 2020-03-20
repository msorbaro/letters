import React from 'react';
import '../style.scss';


export default class newQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }

  onClose = (e) => {
    this.props.onClose();
  };

  onCloseAndSubmit = (e) => {
    this.props.onCloseAndSubmit(this.state.question);
    this.setState({ question: '' });
  };

  handleQuestionChange = (event) => {
    this.setState({ question: event.target.value });
  }


  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal" style={{ left: 0 }}>
        <div className="contentTwo">
          <h1>Enter the Poll You Want to Submit </h1>
          <p> Poll </p>
          <textarea style={{ width: '98%' }} type="text" value={this.state.question} onChange={this.handleQuestionChange} />
        </div>
        <div className="twoButtonsTwo">
          <button
            className="whiteButton"
            type="button"
            onClick={(e) => {
              this.onClose(e);
            }}
          >
            Cancel
          </button>
          <button
            className="greenButton"
            type="button"
            onClick={(e) => {
              this.onCloseAndSubmit(e);
            }}
          >
            Share
          </button>
        </div>
      </div>
    );
  }
}
