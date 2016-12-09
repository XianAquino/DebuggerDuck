import React from 'react';


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
      restaurants: ['Chipotle', 'Jimmy Johns', 'Eureka'],
    };
  }
  componentWillMount() {
    this.setTimeState();


  }

  componentDidMount() {

    
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
    console.log(this.state.time)
  }
  
  onLocationChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    this.setState({location: event.target.value});
  }
  
  onSubmit (){
    this.props.postVolunteer(this.state.location, this.state.time, this.props.currentGroup);
    console.log("On submit at the modal level")
    this.props.onSubmit();
    this.props.getDataForRendering();
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
    this.state.location = this.state.restaurants[0]
    var defaultTime = this.state.time;

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
          
          <button className="red-button" onClick={this.openModal.bind(this)}>
            Volunteer your services
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={this.hideModal.bind(this)}/>
              
            </ModalHeader>
            <div className='modal-inside'>
              <div>
                &nbsp; Please choose a restaurant: &nbsp;
                <select
                onChange={this.onLocationChange.bind(this)} 
                className='modal-input' 
                type="text" 
                id="location">
                {this.state.restaurants.map(restaurant => {
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
              <button className="red-button" onClick={this.onSubmit.bind(this)}>
                Submit
              </button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default VolunteerModal;