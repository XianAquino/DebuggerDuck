import axios from 'axios';
var getMenu = (name,callback)=>{
  //sends a get request that will return an array of menu items for that restaurant name
    axios.get(`/menuItem/${name}`).then((menu)=>{
      callback(menu)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default getMenu