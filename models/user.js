const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  join_date: { type: Date, required: true },
  admin: { type: Boolean },
});

// Virtual for user's URL
UserSchema.virtual('url').get(function () {
  return `/users/${this._id}`;
});

UserSchema.virtual('join_date_formatted').get(function () {
  return DateTime.fromJSDate(this.join_date).toLocaleString(
    DateTime.DATETIME_SHORT
  );
});

// Export model
module.exports = mongoose.model('User', UserSchema);
