const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./util/router.js');
const db = require('./db/schemas.js');
const dbConnection = require('./db/connection.js');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// Use express and export it
const app = express();
module.exports.app = app;

const controller = require('./util/controller.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Check to see if there is a port environment variable or just use port 4040 instead

var port = process.env.PORT || 4040;

//OAuth strategies require a 'verify' function that receives accessToken
//for accessing FB API. Function must invoke 'cb' with a user object
//which will be set at req.user in route handlers after authentication
//Make a strategy for FB authentication

if (!process.env.clientID) {
  var credentials = require('./env/config.js')
}else{
  var deployedUrl = 'https://food-runner2.herokuapp.com/facebook/oauth'
}
var clientID = process.env.clientID || credentials.facebook.clientID
var clientSecret = process.env.clientSecret || credentials.facebook.clientSecret
var callbackURL = deployedUrl || credentials.facebook.callbackURL
  passport.use(new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },
  //facebook sends back tokens and profile
  function(accessToken, refreshToken, profile, done) {
    if(profile.displayName === 'Bennett Staley'){
      (req,res) => {
        res.sendStatus(403);
      }

    }else{
      db.User.findOne({fb_id: profile.id}).exec()
        .then((data) => {
          console.log(data);
          if(!data) {
            new db.User({
              username: profile.displayName,
              fb_id: profile.id,
              picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=normal',
              groups: [{group_id: 2345}]
            }).save()
            .then((data) => {
            })
            .catch((err) => {
              console.error(err);
            })
          }
        })
       return done(null, profile);
    }
  }));


//Serialize and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use body-parser for parsing JSON and URLencoded body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// User cookie-parser to parse cookies we get from Facebook
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Serve the static client HTML files
app.use(express.static(path.join(__dirname, '/../client/public')));
// Serve the static client React files
app.use('/dist', express.static(path.join(__dirname, '/../client/dist')));
// Serve the node modules
app.use('/lib', express.static(path.join(__dirname, '/../node_modules')));
//Wasted a lot of time trying to get passport.authenticate to work inside the router so I placed it here instead
app.get('/login', passport.authenticate('facebook'));

app.get('/facebook/oauth', passport.authenticate('facebook', {failureRedirect: '/login'}),
  (req, res) => {
    let cookie = {
      session: req.sessionID,
      userID: req.user.id
    }
    res.cookie('fr-session', cookie, { maxAge: 900000, httpOnly: true }).redirect('/');
});
//returns all restaurants in our database
app.get('/restaurants',function(req,res){
  db.Restaurant.find({}, function(err, restaurants) {
    var allRestaurants = [];
    restaurants.forEach(function(restaurant) {
      allRestaurants[restaurant.id] = restaurant.name;
    });

    res.send(allRestaurants);
  });
})
//will add a new restaurant to our database when provided a name
app.post('/restaurants/:name',function(req,res){
  // var name = req.params.name
  // console.log(req.params.name)
   var restaurant = new db.Restaurant({
    name: req.params.name,
    menu: []
  })
  restaurant.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
 })
//will get all menu items for the restaurant whos name is provided
app.get('/menuItem/:name',function(req,res){
  var name = req.params.name
  db.Restaurant.find({name:name},function(err,data){
    //we check if there is any data, if not we send back an empty array
    var menu = data.length ? data[0].menu : []
    res.send(menu)
  })
})
//will add a menu item to a restaurant when provided name of that restaurant, the menu item, and the price of it
 app.post('/menuItem/:name/:menuItem/:price',function(req,res){
  var name = req.params.name
  var menuItem = req.params.menuItem
  var price = req.params.price
  db.Restaurant.find({name:name},function(err,data){
    console.log(data[0])
    data[0].menu.push({menuItem:menuItem,price:price})
    data[0].save();
    console.log(`post successful to ${name}! Added ${menuItem} at $${price}`)
    res.send(data)
  })
 })
 //will take the ID of the volunteer box and set its status of pending to false, thus not render anymore
  app.post('/volunteer/:id',function(req,res){
    var id = req.params.id
    db.Order.find({_id:id},function(err,data){
      console.log(data[0].pending)
      data[0].pending = false;
      data[0].save();
      res.send(data)
    })
  })



// Listen for requests on /api and then use the router to determine
// what happens with the requests
app.use('/api', router);



io.on('connection', function(socket){
  console.log('a user connected');


//Listens when a user added a group
  socket.on('groups',function(){
    controller.groups()
    .then(groups => {
      io.emit('groupsAdded',groups)
    })
  })
//Listens when a user added a volunteer container
  socket.on('volunteer', function(){
    controller.volunteers()
    .then(volunteers => {
      io.emit("volunteerAdded", volunteers)
    })
  })

//Listens when a user sends a request
  socket.on('request', function(data){
    console.log("sockets id",data.id);
    controller.requests(data.id)
      .then(requests => {
        console.log("passs requessst!!!",requests)
        io.emit("requestAdded", requests)
      })


    // console.log(data);
    // controller.newRequest(data)
    // .then((data) => {
    //   console.log("save data",data)
    //   io.emit('requestAdded', data);
    // })
    // .then(request => {
    //   console.log(request,"request",request._id);
    // });
    //console.log("request sockets" ,id);
    // controller.requests(id)
    // .then(requests => {
    //   socket.emit("requestAdded", requests)
    // })
    // .catch(err => {
    //   console.log("Error", err);
    // })
  // var id;
  //   socket.on('request', function(data){
  //     id = data.id;
  //   })
  //   controller.requests(id)
  //   .then(requests => {
  //     console.log("passs requessst!!!",requests)
  //     socket.emit("requestAdded", requests)
  //   })
  //   .catch(err => {
  //     console.log("Error", err);
  //   })
  })


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});



//
// // Start the actual server listening on the port variable
// app.listen(module.exports.NODEPORT, function (err) {
//   // If there is an error log it
//   if (err) { console.error(err); }
//   // If there is not an error console log what port the server is running on
//   else { console.log('Server running on port %s', module.exports.NODEPORT) }
// })
