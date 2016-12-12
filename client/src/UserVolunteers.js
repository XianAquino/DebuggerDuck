import React from 'react';
import UserVolunteer from './UserVolunteer.js'

const UserVolunteers = (props) => {
  var size = props.volunteers.length
  return(
    <div className = 'user-volunteer-list'>
      <h2 className='history-header'>Volunteers: { size ? size : 0 }</h2>
      <ul>
        {
          props.volunteers.map( (volunteer) =>
            <UserVolunteer  key ={Math.random()}
              location={volunteer.location}
              time={volunteer.time}
              createdAt={volunteer.createdAt}
            />
          )
        }
      </ul>
    </div>
  )
}

export default UserVolunteers;
