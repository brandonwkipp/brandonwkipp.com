import React from 'react';

import { BlogView } from '@views';

const VoiceCodingWithTalon = () => (
  <BlogView
    date="September 17th, 2020"
    path={'/blog/voice-coding-with-talon'}
    title="Voice Coding with Talon"
  >
    <p>
      I am so happy I found out about Talon Voice! If you've never heard of it before, Talon is a software program that gives users "powerful hands-free input replacement" for writing code with your voice! For someone like me who has suffered on and off from RSI in the past, this software is nothing short of amazing. I finally don't have to worry about non-stop programming because I can switch from using my wrists to using my voice with a simple utterance.
    </p>
    <p>
      The gist of how Talon works is that you have a dictionary mapping of short phrases matched to custom key bindings. Talon uses your microphone to listen for any utterance you might say and triggers the keybinding when it detects the mapping.
    </p>
    <p>
      What I didn't anticipate when I started getting familiar with Talon is how nicely it pairs with Github Copilot. If you're unfamiliar with it, <a href="https://copilot.github.com/" target="_blank">Github Copilot is a VS Code plugin that uses machine learning</a> to generate code for you. I find this to be extremely helpful when writing boilerplate for React components or functions in Golang.
    </p>
  </BlogView>
);

export default VoiceCodingWithTalon;
