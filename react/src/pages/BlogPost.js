import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const BLOG_POST = gql`
  query GetPost($id: ID!) {
    blogPost(id: $id) {
      id
      Title
      published_at
      Content
      categories {
        id
        name
      }
    }
  }
`;

export default function BlogPost() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(BLOG_POST, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <p>Data is loading..</p>;
  }
  if (error) {
    return <p>There was an error loading your data!</p>;
  }

  console.log(
    'BlogPost.js',
    'loading',
    loading,
    'error',
    error,
    'data',
    data.blogPost
  );

  return (
    <div>
      <div key={data.blogPost.id} className="blog-post">
        <h1 className="blog-post__title">{data.blogPost.Title}</h1>
        <ReactMarkdown className="blog-post__content">
          {data.blogPost.Content}
        </ReactMarkdown>
        {data.blogPost.categories.map((category) => {
          return <small key={category.id}>{category.name}</small>;
        })}
        <hr />
      </div>
    </div>
  );
}
