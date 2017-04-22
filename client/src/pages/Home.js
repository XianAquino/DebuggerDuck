import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Home extends Component {
  render () {
    return (
      <div>
        Main
        <button onClick={() => browserHistory.push('/profile/12')}>Click</button>
      </div>
    );
  }
}

export default Home;
