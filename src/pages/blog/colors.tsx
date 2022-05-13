import React from 'react';

import { BlogView } from '@views';

const Colors = () => (
  <BlogView
    date="June 19th, 2016"
    path={'/blog/colors'}
    title="Colors"
  >
    <p>
      Today, I'm updating the color scheme on my website. I've never really researched color theory before today, but there is quite a bit of information out there. I read a few blogs and was vaguely reminded of my high school art class, but I didn't really pay attention back then. Anyway, I found this rad <a href="https://color.adobe.com">tool</a> where you can pick color templates based on dividing the color wheel in attractive ways. The old color scheme I was using was terrible, but to be fair, I had no idea how to pick good colors. It has got me thinking about the way things are packaged, and how satisfying a simple color scheme is. I'm sure I'm more likely to buy a product if its color scheme is pleasing to me.
    </p>
  </BlogView>
);

export default Colors;
