import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card } from 'reactstrap';
import './index.css';

const BLOG_POSTS = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" }} },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
          }
          html
        }
      }
    }
  }
`;

const Blog = () => (
  <StaticQuery
    query={BLOG_POSTS}
    render={(data) => (
      <>
        {data.allMarkdownRemark.edges.map((post) => (
          <Card className="blog-post border-0 rounded-0">
            <h1 className="mt-3 text-center">{post.node.frontmatter.title}</h1>
            <h6 className="text-center">{post.node.frontmatter.date}</h6>
            <div className="mb-3 mx-auto w-75">
              <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
            </div>
          </Card>
        ))}
      </>
    )}
  />
);

export default Blog;

// const IndexPage = ({
//   data: {
//     allMarkdownRemark: { edges },
//   },
// }) => {
//   const Posts = edges
//     .filter(edge => !!edge.node.frontmatter.date)
// You can filter your posts based on some criteria
//     .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
//   return <div>{Posts}</div>
// }
