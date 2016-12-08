import axios from 'axios';
var getAllRestaurants = (callback)=>{
  //sends a get request that will return an array of all restaurant names in our database
    axios.get(`/restaurants`).then((restaurants)=>{
      callback(restaurants)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default getAllRestaurants