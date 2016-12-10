import React from 'react';

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username : this.props.username,
      volunteers:undefined,
      requests: undefined
    }
  }

  ComponentWillMount(){

  }

  render(){
    {console.log("user pofile")}
    return (
      <div className = 'user-profile'>
        <p onClick={()=>this.props.hideUserProfile()}>x</p>
        <img src = {this.props.picture} />
        <p>{this.props.username}</p>
      </div>
    )
  }

}
export default UserProfile
