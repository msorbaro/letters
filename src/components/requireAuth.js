import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent, switchMode) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.updateRestrictedPath(`${this.props.location.pathname}`);
        // this.props.appError('Please sign in or sign up to view that page');
        // this.props.history.push('/');
        this.props.signIn();
      }
      this.props.getUser()
        .then(() => {
          // const { user } = this.props;
          // console.log(user);
          if (!this.props.user.hasCompleteProfile) {
            console.log('here');
            this.props.history.push('/user');
          }
        });
    }

    isInfoEmpty = (string) => {
      return !string || string.length === 0 || !string.toString().trim();
    }

    render() {
      return (
        <div>
          <ComposedComponent
            switchMode={switchMode ? true : undefined}
            {...this.props}
          />
        </div>
      );
    }
  }

  return withRouter((RequireAuth));
}
