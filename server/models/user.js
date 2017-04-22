const db = require('../db/schemas');

module.exports = {
  getInfo: (userId) => {
    return db.User.findOne({ _id: userId });
  }
};
