import React from 'react';
import '../style.scss';


export default class NewLetterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }

  onClose = (e) => {
    this.props.onClose();
  };

  onCloseAndSubmit = (e) => {
    this.props.onCloseAndSubmit(this.state.title, this.state.text);
    this.setState({ title: '', text: '' });
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <div className="content">
          <h1>Enter the Following Fields </h1>
          <p> Title </p>
          <input style={{ width: '50%' }} type="text" value={this.state.title} onChange={this.handleTitleChange} />
          <p> Text </p>
          <textarea style={{ width: '90%', height: 100 }} type="text" value={this.state.text} onChange={this.handleTextChange} />
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