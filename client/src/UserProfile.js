import React from 'react';
import axios from 'axios';
import UserVolunteers from './UserVolunteers.js';
import UserRequests from './UserRequests.js';
import PieChart from './PieChart.js';

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username : this.props.username,
      volunteers:undefined,
      requests: undefined,
      chartData:undefined
    }
  }

  componentWillMount(){
    this.getVolunteers()
      .then(response => {
        var data = []
        this.setState({volunteers:response.data});
        data.push({label:"volunteers",value:response.data.length})
      this.getRequests()
        .then(response => {
          this.setState({requests:response.data});
          data.push({label:"requests",value:response.data.length})
          this.setState({chartData:data});
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

    let size = 300;
    let data = this.state.chartData
    console.log(this.state.chartData,"    data");
    return (
      <div className = 'user-profile'>
        <p className='exit black-button' onClick={()=>this.props.hideUserProfile()}>x</p>
        <h1>Profile</h1>
        <div className = 'profile-left' >
          <img src = {this.props.picture} />
          <p className='user-name'>{this.props.username}</p>
          {
            //don't display the pie chart if data is undefine or both requests and volunteers are empty
            data === undefined || (data[0].value===0&&data[1].value===0) ? null :
            <svg width={size} height= {size}>
              <g transform={`translate(${size/2}, ${size/2})`}>
                <PieChart data={this.state.chartData} size={size}/>
              </g>
            </svg>
          }

        </div>

        <div className = 'user-history'>
          {
            this.state.volunteers === undefined ? null :
            <UserVolunteers volunteers = {this.state.volunteers} />
          }
          {
            this.state.requests === undefined ? null :
            <UserRequests requests = {this.state.requests} />
          }

        </div>


      </div>
    )
  }

}
export default UserProfile
