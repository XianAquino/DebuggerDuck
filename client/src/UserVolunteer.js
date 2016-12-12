import React from 'react';
import formatDate from './lib/formatDate';

const UserVolunteer = (props) => {
  return(
    <li>{props.location} at {props.time} on {formatDate(props.createdAt)}</li>
  )
}

export default UserVolunteer;
