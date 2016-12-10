//This component is the child component of volunteerRequestContainer.js and the parent of request.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getTimer from './lib/getTimer.js'
import axios from 'axios';
import $ from 'jquery';

import io from 'socket.io-client'

const socket = io();


import Request from './Request.js';
import RequestModal from './RequestModal.js';
import changePending from './lib/changePending'
class Volunteer extends Component {
  constructor(props) {
    super(props);
    console.log("Volunteer Props location: ", this.props.volunteer.location)
    this.state = {
      pending: true,
      requests: [],
      count:0
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

  onSubmit(text, price){
    this.postRequest(text, price);
    //  this.setState({text:''});
    //this.setState({requests:this.props.volunteer.requests})
  }

  postRequest(text, price){
    axios.post('/api/request',
      {data:
        {
            username: this.props.username,
            volunteerId: this.props.volunteer._id,
            picture: this.props.picture,
            text: text,
            price: price || 0
        }
      }
    )
    .then(response => {
      console.log('Request submitted: ', response.data);
      this.getRequests(this.props.volunteer._id);
      socket.emit('request',{id:this.props.volunteer._id});
    })
    .catch(error => {
      console.log('Error while submitting food request:', error);
    })

    // var request = {
    //     username: this.props.username,
    //     volunteerId: this.props.volunteer._id,
    //     picture: this.props.picture,
    //     text: text
    //   }
    // socket.emit('request', request);
    //this.getRequests(this.props.volunteer._id);
  }


  getRequests(id) {
    axios.get(`/api/request/${this.props.volunteer._id}`)
      .then( response => {
        console.log("reqqqqq gettttt", response.data[0].requests)
        this.setState( {requests:response.data[0].requests} );
        socket.on('requestAdded', (data) => {
          console.log("resssssssssssss socketsssssssss",data[0].requests);
          this.setState( {requests : data[0].requests} );
        })
    })
    .catch(error => {
        console.log('Error while getting groups: ', error);
    })
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
    this.getRequests(this.props.volunteer._id)

  }


  render() {
    var requests = this.state.requests
    var key = Math.random()
    if (this.state.pending) {
      if (requests.length) {
        return (
          <div className='volunteer-div'>
          <img className='small-profile-pic' src={this.props.volunteer.picture}/>
          {this.props.volunteer.order_user} is going to {this.props.volunteer.location} at {this.demilitarizeTime(this.props.volunteer.time)}
          {
            requests.map(request =>
              <Request
              //I threw math.random as the key because react kept getting angry at me for making duplicate keys??
                key= {Math.random()}
                request={request}/>
            )
          }
          { 
          "The Grand Total is: $" +
          requests.reduce((a,x) => {
            a += x.price
            return a
          }, 0).toFixed(2)
          }
          <RequestModal onSubmit={this.onSubmit.bind(this)} location={this.props.volunteer.location}/>
          </div>
        )
      } else {
        return (
          <div className='volunteer-div'>
          <img className='small-profile-pic' src={this.props.volunteer.picture}/>
          {this.props.volunteer.order_user} is going to {this.props.volunteer.location} at {this.demilitarizeTime(this.props.volunteer.time)}
          <RequestModal onSubmit={this.onSubmit.bind(this)} location={this.props.volunteer.location}/>
          </div>
        )
      }
    } else {
      return(<div></div>)
    }
  }
};

export default Volunteer;
