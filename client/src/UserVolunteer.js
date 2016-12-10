import React from 'react';

const UserVolunteer = (props) => {
  return(
    <li>{props.location} at {props.time} on {props.createdAt}</li>
  )
}

export default UserVolunteer;
