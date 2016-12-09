//This component is the child component of volunteerRequestContainer.js and the parent of request.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getTimer from './lib/getTimer.js'
import Request from './Request.js';
import RequestModal from './RequestModal.js';
import changePending from './lib/changePending'
class Volunteer extends Component {
  constructor(props) {
    super(props);
    console.log("Volunteer Props: ", props)
    this.state = {
      //This info has been funneled down from volunteerRequestContainer, which was funneled down from app.js
      username: this.props.username,
      picture: this.props.picture,
      //we set text as '' because nothing has been entered yet.
      text:'',
      //requests is an array of stuff obtained from the database. 
      //It can be added to by the user by typing into the inputs and submitting.
      requests:this.props.volunteer.requests,
      count:0,
      pending: true
    };
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    this.setState({text: event.target.value});
  }
  removeMe() {
    changePending(this.props.volunteer._id)
    this.setState({pending:false})
  }
  //Run postRequest to send request data to the server.
  //update text state to reset box.
  //run getDataforRendering to update App (somewhat ugly, last-minute hack).
  //update existing requests with new data from props.
  onSubmit(text){
    //console.log('Text?', text, "volunteer id", this.props.volunteer._id);
    this.props.postRequest(this.props.volunteer._id, text);
    this.setState({text:''});
    this.props.getDataForRendering();
    this.setState({requests:this.props.volunteer.requests})
  }

  demilitarizeTime(time) {
    console.log(time)
    time = time.split(':')
    var hr = time[0]
    var m = time[1]
    //m = m > 30 ? m = 30 : m = 0
    //m = m < 9 ? '0' + m : m
    var ampm = hr < 12 ? "AM" : "PM";
    hr = ampm === 'PM' ? hr = hr - 12 : hr = hr
    var dateString = hr + ':' + m + ' ' + ampm
    return dateString
  }
  componentDidMount(){
    //on each volunteer item we'll check if its expired or not by calling getTimer
    var difference =  getTimer(this.props.volunteer.time)
    //if getTimer returns a negative number, we'll send a post request through changePending to update its pending status to false
    difference > 0 ? null : this.removeMe() 

  }


  render() {
  	
      if (this.state.pending){
        return ( 
        <div className='volunteer-div'>
          <img className='small-profile-pic' src={this.props.volunteer.picture}/>
          {this.props.volunteer.order_user} is going to {this.props.volunteer.location} at {this.demilitarizeTime(this.props.volunteer.time)}.
        
        {this.state.requests.map(request =>
          //this goes through the array of requests and maps them using the child component, Request.js
          <Request 
          //I threw math.random as the key because react kept getting angry at me for making duplicate keys??
            key= {Math.random()}
            request={request}/>
          )}
           <RequestModal onSubmit={this.onSubmit.bind(this)}/>
        </div>
      )} else{
          return(<div></div>)
        }
    
        
 }
 
};

export default Volunteer;