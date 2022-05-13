import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Image from '@components/Image';
import { BlogView } from '@views';

const IMG = graphql`
  query {
    imageSharp(fixed: { originalName: { eq: "dht-22-sensors-on-board.jpg" }} ) {
      gatsbyImageData(
        formats: [AUTO, WEBP]
        layout: CONSTRAINED
        quality: 100
        width: 500
      )
    }
  }
`;

const RaspberryPiAirQualitySystem = () => (
  <StaticQuery
    query={IMG}
    render={({ imageSharp: { gatsbyImageData } }) => (
      <BlogView
        date="January 3rd, 2022"
        path={'/blog/raspberry-pi-air-quality-system'}
        title="Raspberry Pi Air Quality System"
      >
        <p>
          For a few years now, I've been working with my Dad to build an air quality monitoring system for his house. The goal is to measure the temperature and humidity in multiple rooms around the house to help him know which dampers should be opened or closed to better control the environment.
        </p>
        <Image
          alt="DHT22 Sensors on Board"
          caption="Three DHT22 sensors on the prototyping board"
          className="w-100"
          data={gatsbyImageData}
          imageBreak
        />
        <p>
          We've iterated on the idea of this system for a few years and we've finally come up with a good prototype to deploy. Thankfully, Dad has already run a bunch of 4-conductor wire throughout the house in anticipation for a project such as this. We're gonna to use it to wire up a bunch of <a href="https://www.adafruit.com/product/385" target="_blank">DHT-22</a> sensors to a central Raspberry Pi in the basement.
        </p>
        <p>
          After doing some research on databases for projects like this, I came across the <a href="https://www.influxdata.com/" target="_blank">InfluxDB time series database</a>. During the initial prototyping phase, I ran into a big roadblock; the default Raspbian OS doesn't support InfluxDB v2, with the included GUI, because it is a 32-bit operating system. This took me by surprise as I had thought Raspbian had always been 64-bit. I briefly tried to work with an older version of InfluxDB that runs on 32-bit systems, and it worked well enough but I really wanted the frontend user interface. I tried installing <a href="https://grafana.com/" target="_blank">Grafana</a> to act as the frontend but ran into the same 32-bit vs 64-bit issue and decided the trouble of maintaining a 32-bit system was not worth it. Next, I tried using Raspbian's 64-bit beta version but still couldn't get it working so finally, I ditched Raspbian for Ubuntu Server.
        </p>
        <p>
          While Ubuntu is Ubuntu, I hadn't ever used Ubuntu Server and immediately ran into an issue connecting to wifi. After some brief googling, I learned <a href="https://netplan.io/" target="_blank">how <code>netplan</code> works</a> (which is apparently what Ubuntu Server uses for wifi) and was able to successfully configure the <code>wlan0</code> interface to connect pretty easily. From there, everything was smooth sailing; InfluxDB installed fine and worked out of the box. Now, all that's left is to connect the sensors and finish the <code>cron</code> script for reading values from each sensor. More to come.
        </p>
      </BlogView>
    )}
  />
);

export default RaspberryPiAirQualitySystem;
