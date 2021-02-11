/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const BlogMediaAsset = graphql`
  fragment BlogMediaAsset on ContentfulMediaAsset {
    ... on ContentfulMediaAsset {
      contentful_id
      caption
      media {
        file {
          contentType
          url
        }
        title
      }
    }
  }
`;
