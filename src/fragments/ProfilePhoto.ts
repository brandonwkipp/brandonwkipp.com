/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const ProfilePhoto = graphql`
  fragment ProfilePhoto on ContentfulAsset {
    ... on ContentfulAsset {
      __typename
      contentful_id
      file {
        contentType
      }
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: FIXED
        quality: 100
        width: 250
      )
    }
  }
`;
