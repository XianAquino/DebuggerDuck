import axios from 'axios';
var changePending = (id)=>{
  //sends a post request when the volunteer offer is expired, and will set its pending status to false, making it no longer render
    axios.post(`/volunteer/${id}`).then((item)=>{
      console.log(`see ya volunteer ${id}`)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default changePending