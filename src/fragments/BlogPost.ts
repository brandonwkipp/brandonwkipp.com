/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const BlogPost = graphql`
  fragment BlogPost on ContentfulBlogPost {
    ... on ContentfulBlogPost {
      body {
        raw
        references {
          ...BlogMediaAsset
        }
      }
      contentful_id
      date(formatString: "MMMM Do, YYYY")
      id
      title
    }
  }
`;