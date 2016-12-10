import React from 'react'

const UserRequest = (props) => {
  return (
    <li>{props.request} on {props.time}</li>
  )
}

export default UserRequest;
