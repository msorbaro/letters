/* eslint no-alert: 0 */
import React, { Component } from 'react';


class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currState: this.props.currState,
      hearts: false,
      old: false,
      neww: true,
    };
  }

  chooseSet = () => {
    if (this.state.hearts) {
      return this.state.sortedByHearts;
    } else if (this.state.old) {
      return this.state.sortedByOld;
    } else if (this.state.neww) {
      return this.state.sortedByRecent;
    } else {
      return this.state.letter;
    }
  }

  turnOnHearts = () => {
    this.setState({ currState: 'HEARTS' });
    this.props.calback(this.props.sortedByHearts, 'HEARTS');
  }

  turnOnOld = () => {
    this.setState({ currState: 'OLD' });
    this.props.calback(this.props.sortedByOld, 'OLD');
  }

  turnOnNeww = () => {
    this.setState({ currState: 'NEW' });
    this.props.calback(this.props.sortedByRecent, 'NEW');
  }

  getDropdown = () => {
    if (this.state.currState === 'OLD') {
      return (
        <div className="dropDwon">
          <p className="dropDownItem" onClick={this.turnOnHearts}>Most Liked</p>
          <p className="dropDownItem" onClick={this.turnOnNeww}>Most Recent</p>
          <p className="dropDownItemActive" onClick={this.turnOnOld}>Least Recent</p>
        </div>
      );
    } else if (this.state.currState === 'HEARTS') {
      return (
        <div className="dropDwon">
          <p className="dropDownItemActive" onClick={this.turnOnHearts}>Most Liked</p>
          <p className="dropDownItem" onClick={this.turnOnNeww}>Most Recent</p>
          <p className="dropDownItem" onClick={this.turnOnOld}>Least Recent</p>
        </div>
      );
    } else {
      return (
        <div className="dropDwon">
          <p className="dropDownItem" onClick={this.turnOnHearts}>Most Liked</p>
          <p className="dropDownItemActive" onClick={this.turnOnNeww}>Most Recent</p>
          <p className="dropDownItem" onClick={this.turnOnOld}>Least Recent</p>
        </div>
      );
    }
  }

  render() {
    if (this.props.shopDropDown) {
      return (<div>{this.getDropdown()}</div>);
    } else {
      return null;
    }
  }
}

// export default NewPost;
export default DropDown;
