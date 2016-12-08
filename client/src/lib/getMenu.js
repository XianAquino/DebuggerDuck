import axios from 'axios';
var getMenu = (options,callback)=>{
    axios.get(`/fetchmenu/${options.location}`).then((menuUrl)=>{
      console.log('the menu Url is: ',menuUrl.data)
      callback(menuUrl.data)
    }).catch(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
  }
  export default getMenu