import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



import io from 'socket.io-client'

const socket = io();

import Volunteer from './Volunteer';
import VolunteerModal from './VolunteerModal'


//This is a child component of app.js and the parent of volunteer.js (and therefore a grandparent(?) of request.js)
var  VolunteerRequestContainer = (props)=>  {


    //Because this.state.volunteers holds ALL the info for all groups and we only want to render the info relevent to the group,
    //We create a variable called filteredVolunteers. Because the database needs the id of the group but we only hold
    // the groups name, we had to pass down a function called getIdFromGroupName that returns the id.
    //Once we have the id, we can use that information to filter through this.state.volunteers to only display the
    //info from that particular group.

    let filteredVolunteers= props.currentData.filter(volunteer => volunteer.group_id === props.getIdFromGroupName(props.currentGroup));
    //Here we check if no one has volunteered yet. If so, we render a div that tells the user that no one has volunteered yet.
    //If they do volunteer, this.state.volunteer will change and the page will render immediately and will display their info.
    if (filteredVolunteers.length===0){
      return(
        <div>
          <div>
            <VolunteerModal  updateKarma ={props.updateKarma} currentGroup={props.currentGroup} postVolunteer={props.postVolunteer} />
          </div>
          <div className='no-requests center'>No one has volunteered to grab food yet. Why don't you go first?</div>
          <div className='center'><button className='black-button new-group' onClick={props.selectDifferentGroup}>Select a different group</button></div>
        </div>
        )
    } else {
      //If there are already volunteers in the system for this particular group, render them.
      console.log("pleasseeeee work");
      return (
        //VolunteerModal pops up when you click the Volunteer Services button

     <div className='request-container'>
        <div>
          <VolunteerModal  updateKarma ={props.updateKarma} currentGroup={props.currentGroup} postVolunteer={props.postVolunteer} />

        </div>
        {props.currentData.filter(volunteer => volunteer.group_id === props.getIdFromGroupName(props.currentGroup) && (volunteer.pending===true))
          .map(volunteer =>
            //Render one Volunteer component for each current volunteer in a given group.
            <Volunteer
            //I put math.random because react got angry at me
            updateKarma ={props.updateKarma}
            postRequest={props.postRequest}
            key={Math.random()}
            username={props.username}
            //commenting out picture for now
            picture={props.picture}
            //This maps out the volunteers in the this.state.volunteers array into the child component, volunteer
            volunteer={volunteer}/>
          )}
        <div className='center'><button className='black-button new-group' onClick={()=>props.selectDifferentGroup()}>Select a different group</button></div>
     </div>
    );
    }
  }


export default VolunteerRequestContainer;
