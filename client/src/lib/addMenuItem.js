import axios from 'axios';
var addMenuItem = (name,item,price,callback)=>{
  //sends a post request with the required name of the restaurant, the item name, and the price of the item. it will add these to a menu item array inside
  //the restaurant object's menu array
    axios.post(`/menuItem/${name}/${item}/${price}`).then((item)=>{
      callback(item)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default addMenuItem