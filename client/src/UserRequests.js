import React from 'react'
import UserRequest from './UserRequest';
import formatDate from './lib/formatDate.js'


const UserRequests = (props) => {
  var size = props.requests.length
  return (
    <div className='user-requests'>
      <h2 className='history-header'>Requests: { size ? size : 0 }</h2>
      <ul>
        {
          props.requests.map( request =>{
            return   <UserRequest request = {request.text} time = {formatDate(request.createdAt) || "not a valid date"}/>
          }

          )
        }
      </ul>
    </div>
  )
}

export default UserRequests;
