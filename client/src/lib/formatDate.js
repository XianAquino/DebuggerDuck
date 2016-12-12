const formatDate = (inputDate) => {
  var date = new Date(inputDate);
  var month = date.getMonth() +1 ;
  var day = date.getDate();
  var year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export default formatDate;
