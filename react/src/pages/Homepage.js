import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const BLOG_POSTS = gql`
  query GetPosts {
    blogPosts {
      Title
      published_at
      id
      Content
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(BLOG_POSTS);

  if (loading) {
    return <p>Data is loading..</p>;
  }
  if (error) {
    return <p>There was an error loading your data!</p>;
  }

  // console.log('loading', loading, 'error', error, 'data', data.blogPosts);

  return (
    <div>
      <h1>Homepage</h1>
      <img
        src="https://larisa-tazmin-strapi.s3.amazonaws.com/41_OW_Jrs_WZL_SX_384_BO_1_204_203_200_3b13caa936.jpg"
        alt="Homepage"
      />

      {data.blogPosts.map((blogPost) => (
        <div key={blogPost.id} className="blog-post">
          <h1 className="blog-post__title">{blogPost.Title}</h1>
          <small>console list</small>
          <p className="blog-post__content">
            {blogPost.Content.substring(0, 200)}...
          </p>
          <Link to={`/blog-posts/${blogPost.id}`} className="blog-post__link">
            Read More
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
}
