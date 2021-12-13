import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Homepage from './pages/Homepage';
import BlogPost from './pages/BlogPost';
import Category from './pages/Category';
import SiteHeader from './components/SiteHeader';

console.log('env: ', process.env.REACT_APP_ENDPOINT);
console.log('node env: ', process.env.NODE_ENV);

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337/graphql'
      : process.env.REACT_APP_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route path="/blog-posts/:id" element={<BlogPost />}></Route>
            <Route path="/category/:id" element={<Category />}></Route>
          </Routes>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
