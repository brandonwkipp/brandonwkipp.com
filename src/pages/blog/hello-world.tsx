import React from 'react';

import { BlogView } from '@views';

const HelloWorld = () => (
  <BlogView
    date="June 3rd, 2016"
    path={'/blog/hello-world'}
    title="Hello World"
  >
    <p>
      New day, different place. I feel as though I'm long overdue for starting an actual blog.
      For the past three years, I've been running Maple Tree Studio with my colleague, Dr. Ian Nie,
      in Beloit, Wisconsin. I loved it. I love mentoring artists and recording many of the bands
      that made up the campus’ flourishing music scene. I met so many creative and talented people
      and got paid to do something I loved. Most importantly, I experienced real life issues never
      discussed during my musical education—like how to troubleshoot around the seemingly endless
      quirks of software/hardware that could derail a session and plunge morale down to the point
      of no return. Luckily, I'm pretty good at troubleshooting and could usually fix the problems.
      Those problems were my original inspiration for creating a web-based audio editor. I’ve seen
      too many people be intimidated by the limited (and expensive) options for creating new sounds.
      I got to work, and almost a year later, my application has the potential to shake up the industry
      by creating an affordable, intuitive, and powerful user experience. I’ve moved to Minneapolis to
      foster a career in creating the kind of user-friendly technology I want to see in the world, and
      I'm confident I'll create what I'm looking to find.
    </p>
  </BlogView>
);

export default HelloWorld;
