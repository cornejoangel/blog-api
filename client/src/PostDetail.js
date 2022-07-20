import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import Post from './components/Post';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const responseData = await response.json();
      setPost(responseData.post);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {post === null && <div>Loading...</div>}
      {post !== null && <Post post={post} />}
      {post !== null && (
        <ul>
          {post.comments.map((comment) => (
            <li key={uniqid()}>{comment.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostDetail;
