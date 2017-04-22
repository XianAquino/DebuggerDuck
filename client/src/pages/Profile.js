import React, { Component } from 'react';

class Profile extends Component {
  render () {
    return (<div>Profile{this.props.params.username}</div>);
  }
}

export default Profile;
