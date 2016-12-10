import React from 'react';

const UserVolunteers = (props) => {
  return(
    <div className = 'user-volunteer-list';
      <h2>Volunteers</h2>
      <ul>
        {
          this.props.volunteers.map( volunteer => {
            <UserVolunteer  volunteer={volunteer}/>
          })
        }
      </ul>
    </div>
  )
}

export default UserVolunteers;
