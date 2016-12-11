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
      price: null,
      menu: [],
      showMenu: false
    }
  }
  componentDidMount() {
    //this will call getMenu on the location we're at in the volunteer Modal
    getMenu(this.props.location, (menu) => {
      //checking if we have menu for that location, if we get nothing back we don't and we keep menu an empty array
      menu.length ? this.setState({menu: menu})  : null
    })
  }
  onTextChange(event) {
    //every time the user types a new letter, the state is changed to the current input
    var value = event.target.value.split('__')
    var text = value[0]
    var price =  value[1]
    console.log('Request Event', text, price);
    this.setState({text: text, price: price});
  }

  onSubmit () {
    //Don't change this invocation.
    console.log('modal text?', this.state.text);
    //check if there is anything inside our price input field, if there is, use that instead
    var price = document.getElementById("price").value.length ? document.getElementById("price").value : this.state.price
    //target and reset our price and text value fields after an onSubmit is fired
    document.getElementById("price").value = '';
    document.getElementById("text").value = '';
    this.props.onSubmit(this.state.text, price);
    //we select every menu selection thingy
    var list = document.getElementsByClassName('menu')
    //we then loop through our html collection which is an array but not an array, so we can't just forEach it
    for (var i = 0; i < list.length; i++) {
      //we then manually set each list to its first value
      list[i].selectedIndex = -1
    }
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
    var menu = this.state.menu
    //this is what we'll show at the top of our option wheel, we update this so the user knows on glance if there is a menu for that custom location or not
    var disabledText = this.state.menu.length ?  '-- select a Menu Item --' : 'No Menu for this location!' 
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
            Spend Karma - Make a request
          </button>

          <Modal isOpen={isOpen} onRequestHide={this.hideModal.bind(this)}>
            <ModalHeader >
              <ModalClose onClick={()=>this.hideModal()}/>

            </ModalHeader>
            <div className='modal-inside'>
              <div>
                Please select an item from our menu below:
                <br />
                <select className="menu" onChange={this.onTextChange.bind(this)}>
                
                  
                    <option disabled selected value>{disabledText}</option>
                      {menu.map(item => {
                        return (
                          <option value={item.menuItem + '__' + item.price}>{item.menuItem} - {item.price}</option>
                        )
                      })
                      }
                </select>
                 
                <br />
                &nbsp; Not There? Add a custom order! &nbsp;
                <br/>
                <input 
                type="text"
                maxLength="140"
                onChange={this.onTextChange.bind(this)}
                className='modal-input third-input'
                id="text"/>
                <br />
                Price
                <br/>
                <input
                  id="price"
                  type="number"
                  min = "0"
                  step = "any"
                  max = "999"
                />
               
                <br />
               
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
