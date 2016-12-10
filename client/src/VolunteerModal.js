import React from 'react';
import getAllRestaurants from './lib/getAllRestaurants.js'

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class VolunteerModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      time: '',
      location: '',
      restaurants: []
    };
  }
  componentWillMount() {
    this.setTimeState();
    getAllRestaurants((restaurant)=>{
      this.setState({restaurants:restaurant.data})
    })

  }

  setTimeState(time) {
    if (time) {
      time = time.split(':')
      var hr = time[0]
      var m = time[1]


    } else {
      var d = new Date()
      var hr = d.getHours()
      var m = d.getMinutes()
      m = m > 30 ? m = 30 : m = 0
      m = m < 9 ? '0' + m : m

    }
      //var ampm = hr < 12 ? "AM" : "PM";
      //hr = ampm === 'PM' ? hr = hr - 12 : hr = hr
      var dateString = hr + ':' + m

    this.setState({time: dateString})
    return dateString
  }

  onTimeChange(event) {
    this.setTimeState(event.target.value);
  }

  onLocationChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    console.log("event location", event);
    this.setState({location: event.target.value});
  }

  onSubmit (){
    this.props.postVolunteer(this.state.location, this.state.time, this.props.currentGroup);
    console.log("On submit at the modal level")
    //resets the option wheel to the greyed out option so people don't just choose the first thing aka Chipotle
    document.getElementById("location").selectedIndex = -1;
    //console.log('does this even work?',document.getElementById('menu').selectedIndex)
    this.hideModal();
    this.setState({
      isOpen: false,
      location: this.state.restaurants[0],
    });
    this.setTimeState();
  }

  openModal (){
    this.setState({
      isOpen: true
    });
  };

  hideModal(){
    this.setState({
      isOpen: false
    });
  };


  render() {
    //Default Values:
    //this.state.location = this.state.restaurants[0]
    var defaultTime = this.state.time;
    var restaurants = this.state.restaurants
    let subModalDialogStyles = {
      base: {
        bottom: -600,
        transition: 'bottom 0.4s'
      },
      open: {
        bottom: 0
      }
    };
    let {isOpen, isSubOpen} = this.state;
    return (
        <div className='center'>

          <button className="red-button" onClick={()=>this.openModal()}>
            Volunteer your services
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={()=>this.hideModal()}/>

            </ModalHeader>
            <div className='modal-inside'>
              <div>
                &nbsp; Please choose a restaurant: &nbsp;
                <select
                onChange={this.onLocationChange.bind(this)}
                className='modal-input'
                type="text"
                id="location">
                <option disabled selected value> -- select a restaurant -- </option>
                {restaurants.map(restaurant => {
                  return (
                    <option value={restaurant}>{restaurant}</option>
                  )
                })}
                </select>
                {/*<input
                onChange={this.onLocationChange.bind(this)}
                className='modal-input'
                type="text"
                id="location"/> */}
              </div>
              <div>
                &nbsp; Please choose the time: &nbsp;
              </div>
              <div>
                <input
                onChange={this.onTimeChange.bind(this)}
                value={defaultTime}
                type="time"
                step="900"
                id="time"/>
              </div>
            </div>
            <ModalFooter>
              <button className="red-button" onClick={()=>this.onSubmit()}>
                Submit
              </button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default VolunteerModal;
