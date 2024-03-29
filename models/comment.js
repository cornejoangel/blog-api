const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, required: true, maxLength: 1024 },
  time_stamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  edited: { type: Boolean, required: true },
  edited_time: { type: Date },
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

CommentSchema.virtual('edit_time_formatted').get(function () {
  if (this.edited) {
    return DateTime.fromJSDate(this.edited_time).toLocaleString(
      DateTime.DATETIME_SHORT_WITH_SECONDS
    );
  }
  return false;
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
