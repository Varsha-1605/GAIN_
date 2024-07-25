const mongoose = require('mongoose');
const { Schema } = mongoose;

// Users Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  googleId: { type: String, optional: true }
});

const User = mongoose.model('User', userSchema);

// UserData Schema
const userDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  preferences: { type: Map, of: String },
  settings: { type: Map, of: String }
});

const UserData = mongoose.model('UserData', userDataSchema);

// Admins Schema
const adminSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { User, UserData, Admin };
