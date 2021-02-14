/* eslint import/prefer-default-export: 0 */
import { graphql } from 'gatsby';

export const ProfilePhoto = graphql`
  fragment ProfilePhoto on ContentfulAsset {
    ... on ContentfulAsset {
      contentful_id
      __typename
      fluid(maxWidth: 300, quality: 100) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
