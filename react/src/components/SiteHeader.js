import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) {
    return <p>Data is loading..</p>;
  }
  if (error) {
    return <p>There was an error loading your data!</p>;
  }

  console.log(
    'SiteHeader.js',
    'loading',
    loading,
    'error',
    error,
    'data',
    data.categories
  );

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Site Header</h1>
      </Link>
      <div className="categories">
        <nav className="categories__navigation">
          <span>Filter reviews by category:</span>
          {data.categories.map((category) => {
            return (
              <section key={category.id} className="category">
                <Link
                  to={`/category/${category.id}`}
                  className="category__link"
                >
                  {category.name}
                </Link>
              </section>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
