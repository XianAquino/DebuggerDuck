
function getTimer(end){
  //get a new date to compare the time to
  var d = new Date()
  //get hours and minutes
  var hour = d.getHours()
  var minute = d.getMinutes()
  //need to split our end into an array of hour and minutes
  end = end.split(':')
  //set a new array with current hour/min
  var start = [hour,minute]   
  //really bad work around to update hours to seconds and minutes to seconds
  var counter = 3600
  for (var i = 0;i < start.length; i++) {
    //update our arrays into seconds
    end[i] = parseInt(end[i]) * counter
    start[i] = (parseInt(start[i]))*counter
    //update the counter for minutes after the first iteration
    counter = counter/60
    }
    //we're adding 15 minutes worth of seconds onto this so it'll expire 15min after the time its supposed to
    end[1] += 900
    //find out the difference between the two times, basically we're looking for if its a negative number or not
  var difference = ((end[0]+end[1])-(start[0]+start[1]))
return difference
}    




export default getTimer