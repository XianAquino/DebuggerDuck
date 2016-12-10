import React from 'react'
import UserRequest from './UserRequest';


const UserRequests = (props) => {
  return (
    <div className='user-requests'>
      <h2>Requests</h2>
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
