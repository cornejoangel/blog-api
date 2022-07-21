import PropTypes from 'prop-types';

const Comment = (props) => {
  const { comment } = props;

  return (
    <div>
      <div>{comment.time_stamp_formatted}</div>
      <p>{comment.body}</p>
      <div>
        - {comment.user.username} - {comment.edited}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
