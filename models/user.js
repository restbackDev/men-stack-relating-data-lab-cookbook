const mongoose = require('mongoose');

// user.js

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

//embed foodSchema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]// YOU DO: embed foodSchema here
});

const Pantry = mongoose.model('User', userSchema);

module.exports = Pantry;
