import React from 'react';
import '../style.scss';

/*
This is the modal for creating a new question
*/
export default class newQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }

  // closes the modal
  onClose = (e) => {
    this.props.onClose();
  };

  // submits the new question
  onCloseAndSubmit = (e) => {
    if (this.state.title !== '' && this.state.text !== '') {
      this.props.onCloseAndSubmit(this.state.question);
      this.setState({ question: '' });
    } else {
      this.setState({ unfilledBoxes: true });
    }
  };

  // handles question input
  handleQuestionChange = (event) => {
    this.setState({ question: event.target.value });
  }


  // shows error if question not all filled in 
  showErrorMessage = () => {
    if (this.state.unfilledBoxes) {
      return (<p className="errorMessage"> * Please fill out all fields </p>);
    } else {
      return (<p />);
    }
  }


  render() {
    if (!this.props.show) {
      return null;
    }
    if (this.props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return (
      <div className="modal" id="modal" style={{ left: 0 }}>
        <div className="contentTwo">
          <h1 className="mobileFriendlyh1">Enter the Poll You Want to Submit </h1>
          {this.showErrorMessage()}
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
