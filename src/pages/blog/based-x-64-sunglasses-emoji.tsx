import React from 'react';

import { BlogView } from '@views';

const Based64SunglassesEmoji = () => (
  <BlogView
    date="July 6th, 2016"
    path={'/blog/based-x-64-sunglasses-emoji'}
    title="Based x 64 (Sunglasses Emoji)"
  >
    <p>
      The vast majority of humans do math in Base 10; we've got 10 symbols (0-9), and all
      our numbers come from those 10 symbols in differing combinations. The binary
      language that computers understand is in Base 2, comprised of only 0's and 1's.
      Base 64, by contrast, utilizes uppercase A-Z, lowercase a-z, 0-9, '+', and '/' which
      adds up to 64 different characters. We use Base 64 as a method of encoding large sets
      of data. Computers sometimes misinterpret binary strings, but Base 64 ensures that data
      is rendered correctly for the end user. Currently, I'm using it to cache HTML5 canvases
      for my new web app, SoundSword. Base16, aka Hexadecimal, is less efficient then using
      Base64, so that's why I'm using it. It works well and loads my canvases much faster than
      redrawing them every time the page loads. I originally made the mistake of storing the
      Base 64 strings in my MySQL database, but the cached images can take up 100,000 characters
      of code or more; reading them from the database could cause a serious strain on the network.
      Now I store the cached files in a directory. Which brings me to my next challenge: storing
      audio files. While a directory has more than enough storage for tiny canvases, audio files
      comprise millions of characters of code in Base 64. Even the limp melody of a Taylor Swift
      song would cause the browser to run out of memory and crash. I've got a couple of ideas, but
      I'm not sure they will work.
    </p>
  </BlogView>
);

export default Based64SunglassesEmoji;
