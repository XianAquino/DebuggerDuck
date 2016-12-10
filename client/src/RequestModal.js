import React from 'react';
import getMenu from './lib/getMenu.js'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      text:'',
      menu: []
    }
  }
  componentDidMount() {
    //this will call getMenu on the location we're at in the volunteer Modal
    getMenu(this.props.location, (menu) => {
      this.setState({menu: menu})
    })
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    console.log('Request Event', event.target.value);
    this.setState({text: event.target.value});
  }

  onSubmit () {
    //Don't change this invocation.
    console.log('modal text?', this.state.text);
    this.props.onSubmit(this.state.text);
    this.hideModal();
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
          <button className="red-button" onClick={() => this.openModal()}>
            Make a request
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={()=>this.hideModal()}/>

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
                        <option value={item.menuItem + '_' + item.price}>{item.menuItem} - {item.price}</option>
                      )
                    })}
                </select>
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

export default RequestModal;
