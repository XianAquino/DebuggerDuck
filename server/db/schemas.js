const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const connection = require('./connection.js')
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;
//initializes a autoincrement to keep better track of our restaurants
autoIncrement.initialize(connection);

// initiate a database variable to attach schemas to
let db = {};

const UserSchema = new Schema ({
	//mongoose will automatically create a unique id, so no need to manually create one
	username: String,
	fb_id: String,
	picture: String,
	groups: [{group_id: String, karma: {type: Number, default:0}}],
	karma: {type: Number, default:2}
});

var restaurantSchema = new Schema({
  name : String,
  menu : [ {menuItem: String, price:Number} ]
});



// let getNameFromFb = function(input){
// 	//TODO?: Using fbs api, retrieve the name from fb
// 	return input;
// }
// let getPicFromFb = function(input){
// 	//TODO: Using fbs api, retrieve the picture from fb
// 	return input;
// }

// UserSchema.pre('save', function(next) {
//   let username = getNameFromFb(input);
//   this.username = name;
//   let picture = getPicFromFb(input);
//   this.picture = picture;
//   next();
// });

const GroupSchema = new Schema ({
	// Will automatically generate group id
	name: String
})

const OrderSchema = new Schema ({
	// Will automatically generate order id
	order_user: String,
	location: String,
	time: String,
	group_id: String,
	picture: String,
	requests: [{user_id: String, picture: String, text: String, price: Number, createdAt: { type : Date, default: Date.now }}],
	createdAt: { type : Date, default: Date.now },
	pending: {type:Boolean, default: true}
})
restaurantSchema.plugin(autoIncrement.plugin, { model: 'restaurant' });
db.Restaurant = mongoose.model('restaurant', restaurantSchema);
db.User = mongoose.model('user', UserSchema);
db.Group = mongoose.model('group', GroupSchema);
db.Order = mongoose.model('order', OrderSchema);

module.exports = db;
