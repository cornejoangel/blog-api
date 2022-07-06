const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  body: { type: String, required: true, maxLength: 1024 },
  time_stamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  public: { type: Boolean, required: true },
});

PostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

PostSchema.virtual('time_stamp_formatted').get(function () {
  return DateTime.fromJSDate(this.time_stamp).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

// Export model
module.exports = mongoose.model('Post', PostSchema);