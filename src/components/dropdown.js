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
    console.log('DO I HAPPEN');
    if (this.state.hearts) {
      console.log('I should be here');
      return this.state.sortedByHearts;
    } else if (this.state.old) {
      console.log('maybe i came here');
      return this.state.sortedByOld;
    } else if (this.state.neww) {
      console.log('I am deff here');
      return this.state.sortedByRecent;
    } else {
      console.log('am i here?s');
      return this.state.letter;
    }
  }

  turnOnHearts = () => {
    console.log('here I was clicked meep');
    this.props.calback(this.props.sortedByHearts);
  }

  turnOnOld = () => {
    console.log('here I was clicked meep');
    this.props.calback(this.props.sortedByOld);
  }

  turnOnNeww = () => {
    console.log('here I was clicked meep');
    this.props.calback(this.props.sortedByRecent);
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
      console.log('sad here');
      return null;
    }
  }
}

// export default NewPost;
export default DropDown;
