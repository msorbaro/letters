import React from 'react';
import '../style.scss';

/*
Modal for adding a new letter
*/
export default class NewLetterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      unfilledBoxes: false,
    };
  }

  onClose = (e) => {
    this.props.onClose();
  };

  // submits the new letter to the databsae
  onCloseAndSubmit = (e) => {
    if (this.state.title !== '' && this.state.text !== '') {
      this.props.onCloseAndSubmit(this.state.title, this.state.text);
      this.setState({ title: '', text: '' });
    } else {
      this.setState({ unfilledBoxes: true });
    }
  };


  // allows user to add title for the letter
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  // allows user to add text for the question
  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  // shows error if everything not filled in 
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
      <div className="modal" id="modal">
        <div className="content">
          <h1 className="removeSomeMobilePadding">Create your letter </h1>
          {this.showErrorMessage()}
          <p> Subject </p>
          <input style={{ width: '50%', height: 20 }} type="text" value={this.state.title} onChange={this.handleTitleChange} />
          <p> Text </p>
          <textarea style={{ width: '90%', height: '70px' }} type="text" value={this.state.text} onChange={this.handleTextChange} />
        </div>
        <div className="twoButtons">
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
