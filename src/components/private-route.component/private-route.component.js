import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'



class PrivateRoute extends Component {

  render() {
    const { isLoggedIn, redirectTo, location, keepSearch, component: Component, render, ...rest } = this.props;
    let redirectElement = redirectTo;
    if (keepSearch) {
      redirectElement = `${redirectTo}?redirect=${location.pathname.replace(/\//g, '')}&${location.search.replace(/\?/g, '')}`;
    }
    return (
      <Route {...rest} render={(props) => (
        isLoggedIn
          ? (render ? render : <Component {...props} />)
          : <Redirect to={redirectElement} />
      )} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
