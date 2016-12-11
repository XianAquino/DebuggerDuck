//Login.js displays a facebook button
import React, {Component} from 'react';
import FacebookButton from './FacebookButton.js';

//Not much to this component. Just some minor styling.

class LandingPage extends Component {
   constructor(props) {
    super(props);
    this.state = {};
  }

   render() {
      return (
      	<div className='landing-page'>
          <div className='landing-side'>
        		<div className='spacer'></div>
            <div className='landing-runner'></div>
          	<div className='welcome'>
              <h1>Welcome to </h1>
              <h2>Food Runner 2.0</h2>
            </div>
          	<div className='tag-line'>
              <p>Help your team. &nbsp; Help yourself. &nbsp; Eat real food.</p>
            </div>
          	<FacebookButton onClick={() => this.props.login} position={'bottom'}/>
          </div>
        </div>
      )
   }

};

export default LandingPage;
