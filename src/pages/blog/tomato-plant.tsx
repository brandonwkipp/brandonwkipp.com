import React from 'react';

import { BlogView } from '@views';

const TomatoPlant = () => (
  <BlogView
    date="June 28th, 2016"
    path={'/blog/tomato-plant'}
    title="Tomato Plant"
  >
    <p>
      Today, my partner brought home a Cherry Tomato plant from a local church. It's
      pretty small, but it's growing so fast I swear I can see it move. I've got this
      UV grow light that only emits the relevant wavelengths for photosynthesis. It's
      sort of pink, and reminiscent of a nightclub—much different from the cheery
      yellow that we normally experience. It's easy to take plants for granted, but
      we have a lot to learn from them.
      <a href="https://advances.sciencemag.org/content/1/10/e1501136">An article</a> that
      came out a while back discusses roses that were made to hold electrical circuits.
      What does that mean for the future? Maybe if trees were able to transmit WiFi, we would stop cutting them down.
    </p>
  </BlogView>
);

export default TomatoPlant;
