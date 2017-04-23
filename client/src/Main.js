import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

import Login from './pages/Login';

class Main extends Component {
  componentWillMount () {
    this.props.actions.checkLoginStatus();
  }

  render () {
    const { user, children } = this.props;
    const { isLoggedIn, loading } = user;
    console.log("login", isLoggedIn);
    return (
      <div>
        <p>Food Runner</p>
        { isLoggedIn ? children : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
