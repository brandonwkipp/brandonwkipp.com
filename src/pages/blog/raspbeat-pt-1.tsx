import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Image from '@components/Image';
import { BlogView } from '@views';

const IMG = graphql`
  query {
    imageSharp(fixed: { originalName: { eq: "jack-pad.png" }} ) {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: CONSTRAINED
        quality: 100
        width: 500
      )
    }
  }
`

const RaspberryPt1 = () => (
  <StaticQuery
    query={IMG}
    render={({ imageSharp: { gatsbyImageData } }) => (
      <BlogView
        date="June 3rd, 2016"
        path={'/blog/raspbeat-pt-1'}
        title="Raspbeat Pt. 1"
      >
        <p>
          For years now, I have dreamed of building a hardware MIDI device. I initially got the inspiration
          after learning that the Rock Band drum set has MIDI capabilities. So, I bought a used one at
          Goodwill and proceeded to rip it apart. Upon examining the insides of the pads, I was pleasantly surprised
          these mysterious devices were nothing more than a piezo sensor glued to a rubber circle. I'd learned about
          piezos at school when my teacher, <a href="https://en.wikipedia.org/wiki/Biff_Blumfumgagnge">Biff</a>, came
          riding into class one day on a bicycle he transformed into a MIDI controller by covering it in piezos and DIN
          plugs. The lightbulb went off in my brain as it became clear creating a MIDI controller is relatively simple.
          Inspired, I took my ripped up Rock Band drum set pads, soldered an input jack to its piezo, and screwed the
          pad and jack to a block of wood. After assembly, I grabbed an Arduino Uno and
          wrote <a href="https://github.com/brandonwkipp/raspbeat">a simple sketch to transform an analog input into a MIDI message</a>.
          After creating a makeshift box out of some old cardboard and some quick soldering, it was up and running. I hooked
          everything up and tapped the pad with a drum stick and voila, MIDI. I felt like a wizard. It was very rewarding to combine
          my love of music with my new love of code.
        </p>
        <Image alt="Jack Pad" caption="Not as cool as Biff's MIDI bike" className="mb-0 w-100" data={gatsbyImageData} />
      </BlogView>
    )}
  />
);

export default RaspberryPt1;
