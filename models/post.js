const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, maxLength: 100 },
  body: { type: String, required: true, maxLength: 10000 },
  time_stamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hidden: { type: Boolean, required: true },
  edited: { type: Boolean, required: true },
  edited_time: { type: Date },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

PostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

PostSchema.virtual('time_stamp_formatted').get(function () {
  return DateTime.fromJSDate(this.time_stamp).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

PostSchema.virtual('edit_time_formatted').get(function () {
  if (this.edited) {
    return DateTime.fromJSDate(this.edited_time).toLocaleString(
      DateTime.DATETIME_SHORT_WITH_SECONDS
    );
  }
  return false;
});

// Export model
module.exports = mongoose.model('Post', PostSchema);
