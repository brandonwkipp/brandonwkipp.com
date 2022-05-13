import React from 'react';

import { BlogView } from '@views';

const Simpler = () => (
  <BlogView
    date="October 24th, 2019"
    path={'/blog/simpler'}
    title="Simpler"
  >
    <p>
      I just got done with publishing the latest iteration of this site. It
      looks a little more put together, especially on phones. For this
      iteration, I've moved to a new tech stack called <em>GatsbyJS</em> and
      boy, is it <em><i>miles</i></em> better than what I've been using in the past. Though it took
      some work to move to this new ecosystem, I'm reaping some good benefits
      including saving $60/year in hosting costs and being able to publish
      changes instantaneously. It feels really good to edit the code locally
      on my computer and push it to the cloud when I'm done. No more databases,
      no more servers, no more DNS routing. Just JavaScript and HTML.
    </p>
    <p>
      The drive for simplification is part of a larger set of actions that have
      been taking place in my life lately. I'm letting go of a lot in an effort
      to make my life simpler. Friendships, business relationships, the amount
      of things I own, the schedule I maintain, all of that stuff became way to
      complicated for my liking. I wanted more control over my life and just like
      in Aesop's fable about the dude who couldn't get his hand out of the jar, I
      had to let go to move on. And that's kind of the way it should be, right? If
      you want things to be simpler, a great way to do that is to reduce the
      complexity of the system(s). Often times, that's putting the desire to help
      any and every person, to be everything to everybody, and to have everyone
      like you down. Take some of the weight off.
    </p>
  </BlogView>
);

export default Simpler;
