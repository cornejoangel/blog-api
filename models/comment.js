const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, required: true, maxLength: 1024 },
  time_stamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

CommentSchema.virtual('url').get(function () {
  return `/comments/${this._id}`;
});

CommentSchema.virtual('time_stamp_formatted').get(function () {
  return DateTime.fromJSDate(this.time_stamp).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
