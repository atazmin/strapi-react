import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      blog_posts {
        id
        Title
        Content
        categories {
          id
          name
        }
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
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

  console.log('Category.js', 'loading', loading, 'error', error, 'data', data);

  return (
    <div>
      <h1 class={data.category.id}>Category name: {data.category.name}</h1>
      {data.category.blog_posts.map((blogPost) => (
        <section>
          <h3 className={blogPost.id}>{blogPost.Title}</h3>
          <div>
            <h6>Categories:</h6>
            {blogPost.categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                {category.name}
              </Link>
            ))}
          </div>
          <p>{blogPost.Content.substring(0, 200)}...</p>
          <Link to={`/blog-posts/${blogPost.id}`}>Read More</Link>
        </section>
      ))}
    </div>
  );
}
