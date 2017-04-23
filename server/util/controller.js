const db = require('../db/schemas.js');
var ObjectId = require('mongodb').ObjectID;

// Returns an object with a key of data
const buildResObj = function (data) {
  return {
    data: data
  }
}

module.exports = {
  //for socket connection--------------
  groups : () => {
    return db.Group.find({});
  },

  volunteers : () => {
    //we only get back what isn't expired, so we load and pick through less data
    return db.Order.find({pending:true});
  },

  requests : (id) => {
    return db.Order.find({'_id':ObjectId(id)});
  },

  newRequest : (request) => {
    console.log("requestttttttttttttt database ",request);
    return db.Order.findOneAndUpdate(
       {_id:request.volunteerId},
       {$push: { requests:{user_id: request.username, picture: request.picture, text:request.text} } }
      )
  },
  //----------------socket connection
  user: {
    get: (req, res) => {
      db.User.findOne({fb_id: req.user.id}).exec()
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(400);
        })
    },
    loggedIn: (req, res) => {
      if (req.sessionID) {
        res.send(true);
      } else {
        res.sendStatus(401);
      }
    },
    logout: (req, res) => {
      req.session.destroy();
      res.redirect('/');
    },
    volunteers:(req, res) => {
      var user = req.params.user_name;
      db.Order.find({order_user:user}).exec()
      .then(function(data){
        res.send(data);
      })
    },
    requests: (req,res) => {
      var user = req.params.user_name;
      db.Order.find().exec()
      .then(function(data){
        var requests = [];
        data.forEach(function(volunteers){
          var userRequests = volunteers.requests.filter((request)=> request.user_id===user);
          requests = requests.concat(userRequests);
        })
        res.send(requests);
      })
    }

  },

  group: {
    // Group controller functions for GET
    get: (req, res) => {
      db.Group.find().exec()
        .then((groups) => {
          let response = buildResObj(groups);
          res.status(200).send(response);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(400);
        })
    },
    // Group controller functions for GET
    post: (req, res) => {
      // Look in the database to see if there is a Group with the given name already
      db.Group.findOne({name: req.body.data.groupName}).exec()
      .then((data) => {
        // If we don't get any data, add the request body into the database
        if(!data) {
          new db.Group({name: req.body.data.groupName}).save()
          .then((data) => {
            // Send a 201 status that it was completed
            res.sendStatus(201);
          })
          // Catch the error and log it in the server console
          .catch((err) => {
            console.error(err);
            res.sendStatus(400);
          })
        }
        else {
          // Send a 401 status and a message that the group is already added the database
          res.status(401).send('Group is already in the database.')
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },

  volunteer: {
    // Volunteer controller functions for GET
    get: (req, res) => {
      db.Order.find().exec()
        .then((volunteers) => {
          let response = buildResObj(volunteers);
          res.status(200).send(response);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(400);
        })
    },
    // Volunteer controller functions for POST
    post: (req, res) => {
      //add functionality here to update karma
      console.log("request body!!!!!", req.body.data)


      db.User.findOneAndUpdate({username: req.body.data.username}, { $inc: { karma: 5 } }, {upsert: false})
      .then((data) => {
        console.log("db data!!!!", data) //we want data.order_user

      })
      .catch((err) => {
        console.log(err)
      })

      new db.Order({
        order_user: req.body.data.username,
        location: req.body.data.location,
        time: req.body.data.time,
        picture: req.body.data.picture,
        group_id: req.body.data.groupId,
        requests: req.body.data.requests
      }).save()
      .then((data) => {
        console.log("data!!!!", data) //we want data.order_user
        res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
    }
  },

  request: {
    // Request controller functions for POST
    //Data is posted in req.body
    post: (req, res) => {
      console.log("request body!!!!!!", req.body)

      db.User.findOneAndUpdate({username: req.body.data.username}, { $inc: { karma: -1 } }, {upsert: false})
      .then((data) => {
        console.log("db data!!!!", data) //we want data.order_user

      })
      .catch((err) => {
        console.log(err)
      })

      db.Order.findOneAndUpdate(
         {_id:req.body.data.volunteerId},
         {$push: { requests:{user_id: req.body.data.username, picture: req.body.data.picture, text:req.body.data.text, price:req.body.data.price} } }
        )
      .then((data) => {
        //console.log('Data sent to DB.', data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.sendStatus(400)
      })
      //console.log('Request POST', req);

   },

   get : (req, res) => {
     var id = req.params.group_id;
     console.log("id",req.params);
     db.Order.find({'_id':ObjectId(id)})
     .then((data) => {
       // console.log("passs");
       // console.log("sdf",data);
       res.status(201).send(data);
     }).catch((err) => {
       res.sendStatus(400);
     })
   }
},

  logout: {
    get: (req, res) => {
      res.sendStatus(200);

     }
   },

}
