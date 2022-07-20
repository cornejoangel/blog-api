import PropTypes from 'prop-types';

const Post = (props) => {
  const { post } = props;
  const commentCount = post.comments?.length;

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.time_stamp_formatted}</div>
      <p>{post.body}</p>
      <div>
        - {post.user.username} - {post.hidden} - {post.edited}
      </div>
      <div>
        {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
