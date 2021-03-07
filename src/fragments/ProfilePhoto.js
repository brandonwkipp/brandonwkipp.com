/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const ProfilePhoto = graphql`
  fragment ProfilePhoto on ContentfulAsset {
    ... on ContentfulAsset {
      contentful_id
      __typename
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: FIXED
        quality: 50
        width: 250
      )
    }
  }
`;
