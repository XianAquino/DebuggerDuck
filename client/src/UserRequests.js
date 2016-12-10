import React from 'react'
import UserRequest from './UserRequest';


const UserRequests = (props) => {
  var size = props.requests.length
  return (
    <div className='user-requests'>
      <h2>Requests: { size ? size : 0 }</h2>
      <ul>
        {
          props.requests.map( request =>
          <UserRequest request = {request.text} time = {request.createdAt}/>
          )
        }
      </ul>
    </div>
  )
}

export default UserRequests;
