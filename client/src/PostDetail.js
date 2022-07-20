import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    </div>
  );
};

export default PostDetail;
