import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const BLOG_POSTS = graphql`
  query {
    intersect {
      posts {
        id
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
      <>
        {data.intersect.posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </>
    )}
  />
);

export default Blog;
