/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const BlogMediaAsset = graphql`
  fragment BlogMediaAsset on ContentfulMediaAsset {
    ... on ContentfulMediaAsset {
      contentful_id
      caption
      media {
        gatsbyImageData(
          formats: [AUTO, WEBP]
          layout: CONSTRAINED
          quality: 100
          width: 500
        )
        title
      }
    }
  }
`;
