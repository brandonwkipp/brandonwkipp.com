import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import './index.css';

const BLOG_POSTS = graphql`
  query {
    intersect {
      posts {
        id
        date_created
        title
        body
      }
    }
  }
`;

const Blog = () => (
  <StaticQuery
    query={BLOG_POSTS}
    render={(data) => (
      <div id="blog-container">
        {data.intersect.posts.map((post) => (
          <div className="post card" key={post.id}>
            <h2 className="post-title mt-2 mb-0">{post.title}</h2>
            <p className="post-date mb-2">{post.date_created}</p>
            <p className="post-body mx-auto">{post.body}</p>
          </div>
        ))}
      </div>
    )}
  />
);

export default Blog;
