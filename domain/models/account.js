const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  // Define your schema here
});

module.exports = mongoose.model('account', accountSchema);
