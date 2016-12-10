import React from 'react';
import axios from 'axios';
import UserVolunteers from './UserVolunteers.js'

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username : this.props.username,
      volunteers:undefined,
      requests: undefined
    }
  }

  componentWillMount(){
    this.getVolunteers()
    .then(response => {
      this.setState({volunteers:response.data});
    this.getRequests()
        .then(response => {
          this.setState({requests:response.data});
        });
    });

  }

  getVolunteers(){
   return  axios.get(`api/user/volunteers/${this.state.username}`)
  }

  getRequests(){
    return  axios.get(`api/user/requests/${this.state.username}`)
  }

  render(){
    return (
      <div className = 'user-profile'>
        <p onClick={()=>this.props.hideUserProfile()}>x</p>
        <img src = {this.props.picture} />
        <p>{this.props.username}</p>
        <div className = 'user-history'>
          {
            this.state.volunteers === undefined? null :
            <UserVolunteers volunteers = {this.state.volunteers}/>
          }
        </div>
      </div>
    )
  }

}
export default UserProfile
