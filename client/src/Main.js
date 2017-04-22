import React, { Component } from 'react';

class Main extends Component {
  render () {
    return (
      <div>
        <p>Food Runner</p>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
