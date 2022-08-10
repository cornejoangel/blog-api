import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Comment = (props) => {
  const { comment } = props;
  const commentCount = comment.comments?.length;

  return (
    <div>
      <div>{comment.time_stamp_formatted}</div>
      <p>{comment.body}</p>
      <div>
        - {comment.user.username} - {comment.edited}
      </div>
      <div>
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
