/* eslint no-alert: 0 */
import React, { Component } from 'react';


class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.calback(this.props.sortedByHearts, 'HEARTS');
  }

  turnOnOld = () => {
    this.props.calback(this.props.sortedByOld, 'OLD');
  }

  turnOnNeww = () => {
    this.props.calback(this.props.sortedByRecent, 'NEW');
  }

  render() {
    if (this.props.shopDropDown) {
      return (
        <div className="dropDwon">
          <p onClick={this.turnOnHearts}>Most Liked</p>
          <p onClick={this.turnOnNeww}>Most Recent</p>
          <p onClick={this.turnOnOld}>Least Recent</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

// export default NewPost;
export default DropDown;
