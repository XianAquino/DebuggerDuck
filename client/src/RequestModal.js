import React from 'react';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class RequestModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      text:'',
      menu: [
        {
          id: '1',
          name: 'Chicken Burrito',
          price: '6.95'
        },
        {
          id: '2',
          name: 'Beef Burrito',
          price: '6.95'
        }
      ]
    };
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    console.log('Request Event', event.target.value);
    this.setState({text: event.target.value});
  }
  
  onSubmit (){
    //Don't change this invocation.
    console.log('modal text?', this.state.text);
    this.props.onSubmit(this.state.text);
    this.setState({
      isOpen: false,
      text: ''
    });
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
        <div className='center orange'>
          <button className="red-button" onClick={this.openModal.bind(this)}>
            Make a request
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={this.hideModal.bind(this)}/>
              
            </ModalHeader>
            <div className='modal-inside'>
              <div>
                &nbsp; What would you like? &nbsp;
                <br />
                <input onChange={this.onTextChange.bind(this)} 
                className='modal-input third-input' 
                type="text" 
                id="text"/>
                &nbsp; Quantity &nbsp;
                <input 
                  type="number"
                  min = "0"
                  max = "9"
                />
                &nbsp; MENU: &nbsp;
                <br />
                <select onChange={this.onTextChange.bind(this)}>
                    {this.state.menu.map(item => {
                      return ( 
                        <option value={item.name + '_' + item.price}>{item.name} - {item.price}</option>
                      )
                    })}
                </select>
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

export default RequestModal;