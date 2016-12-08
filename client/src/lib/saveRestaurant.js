import axios from 'axios';
var saveRestaurant = (name,callback)=>{
  //sends a post request with the required name and it will add that restaurant to our database with an empty menu array
    axios.post(`/restaurants/${name}`).then((restaurants)=>{
      callback(restaurants)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default saveRestaurant