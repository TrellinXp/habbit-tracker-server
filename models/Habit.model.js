const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const habitSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  unit: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

 
module.exports = model('Habit', habitSchema);