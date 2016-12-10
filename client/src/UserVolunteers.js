import React from 'react';
import UserVolunteer from './UserVolunteer.js'

const UserVolunteers = (props) => {
  return(
    <div className = 'user-volunteer-list'>
      <h2>Volunteers</h2>
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
