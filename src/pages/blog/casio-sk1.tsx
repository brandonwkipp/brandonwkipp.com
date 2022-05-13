import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Image from '@components/Image';
import { BlogView } from '@views';

const IMG = graphql`
  query {
    imageSharp(fixed: { originalName: { eq: "casio-sk1.jpg" }} ) {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: CONSTRAINED
        quality: 100
        width: 500
      )
    }
  }
`;

const CasioSK1 = () => (
  <StaticQuery
    query={IMG}
    render={({ imageSharp: { gatsbyImageData } }) => (
      <BlogView
        date="February 25th, 2020"
        path={'/blog/raspbeat-pt-1'}
        title="Casio SK-1"
      >
        <Image alt="Casio SK-1 Keyboard" className="mb-0 w-100" data={gatsbyImageData} />
        <p>
          My workplace sometimes has these "treasure trove" days where employees can bring in objects they no longer want and give them away in a kind of anonymous swap meet. In the past, what you might describe as "junk" had a way of finding its way into my lap. That is to say, when these kinds of situations have presented themselves, I often end up with too much, thinking I can find the time and resources to repair or use various electronics. That said, I have been implementing a more minimalist lifestyle lately, but I still wanted to remain vigilant.
        </p>
        <p>
          Thankfully, there wasn't much to piqued my interest, except for a literal bucket of <a href="https://reverb.com/marketplace?query=Casio%20SK-1">Casio SK-1</a> sampling keyboards. It was too good to not pass up, seeing as I don't own a hardware sampler. I took two, in case on breaks, and I'm glad I did. It is really a treat to play and goes well with my other smaller keyboards. Score.
        </p>
      </BlogView>
    )}
  />
);

export default CasioSK1;
