import PropTypes from 'prop-types';
import '../styles/Post.scss';

const Post = (props) => {
  const { post } = props;
  const commentCount = post.comments?.length;

  return (
    <div className="post">
      <div className="author">{post.user.username}</div>
      <div className="time-container">
        <div className="time">{post.time_stamp_formatted}</div>
        {post.edited && (
          <div className="edited">(Edited: {post.edit_time_formatted})</div>
        )}
      </div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="comment-count">
        {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
