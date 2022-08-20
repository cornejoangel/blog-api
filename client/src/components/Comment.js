import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Comment.scss';

const Comment = (props) => {
  const { comment } = props;
  const commentCount = comment.comments?.length;

  return (
    <div className="comment">
      <div className="author">{comment.user.username}</div>
      <div className="time-container">
        <div className="time">{comment.time_stamp_formatted}</div>
        {comment.edited && (
          <div className="edited">(Edited: {comment.edit_time_formatted})</div>
        )}
      </div>
      <p>{comment.body}</p>
      <div className="comment-count">
        <Link to={`/comments/${comment._id}`}>
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </Link>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
