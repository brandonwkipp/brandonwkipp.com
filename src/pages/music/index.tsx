import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';

import ShowCard from '@components/ShowCard';
import { DefaultView } from '@views';

import './index.scss';

interface PageProps {
  location: {
    pathname: string;
  };
}

const MusicPage = ({ location: { pathname } }: PageProps) => (
  <DefaultView mainClass="music" path={pathname}>
    <Container className="px-3" fluid id="theList">
      <Row>
        <Col className="mx-auto" md={6}>
          <Card className="border-0 p-3 rounded-0">
            <ShowCard
              artist="Okayt98"
              date="December 21st, 2019"
              venue={{ cityState: "Beloit, WI", name: "Tin Dog Records" }}
            >
              <p>
                I had a blast at this show. As we played, I stepped on my fuzz box and broke a lead on the battery connector. No monitors, very hard to hear what I was playing, but people tell me we sounded good.
              </p>
            </ShowCard>
            <ShowCard
              artist='troyleft'
              date="December 29th, 2017"
              venue={{ cityState: 'Janesville, WI', name: 'The Armory' }}
            >
              <p>Played guitar on "Pupils of the Pupil" &amp; ran sound with Frank.</p>
            </ShowCard>
            <ShowCard
              artist="troy &amp; eli"
              date="April 24th, 2014"
              venue={{ cityState: "Beloit, WI", name: "Coughy Haus" }}
            >
              <p>Eli and I played a cover of "Ordinary People" by John Legend.</p>
            </ShowCard>
            <ShowCard
              artist="Ashkar Room"
              date="April 19th, 2014"
              venue={{ cityState: "Beloit, WI", name: "Coughy Haus" }}
            >
              <p>Drums. Pretty sure I broke a head during the set. </p>
            </ShowCard>
            <ShowCard
              artist="Esperé Eckard-Lee"
              date="April 19th, 2014"
              venue={{ cityState: "Beloit, WI", name: "Coughy Haus" }}
            >
              <p>I played bass and had fun with the Eckard-Lee brothers. Miss you both.</p>
            </ShowCard>
            <ShowCard
              artist="Anti Matter"
              date="January 28th, 2012"
              venue={{ cityState: "Beloit, WI", name: "Mike's Road House" }}
            >
              <p>
                All I remember from this show is that Jonah forgot his cue during the breakdown of "Welcome to Paradise."
              </p>
            </ShowCard>
            <ShowCard
              artist="Anti Matter"
              date="November 18th, 2011"
              venue={{ cityState: "Beloit, WI", name: `Bushel &amp; Peck's` }}
            >
              <p>
                This was our first show as a band. I think by this point, we were a couple months old. Shout to Darious for hooking us up with a spot.
              </p>
            </ShowCard>
            <ShowCard
              artist="Brandon W. Kipp"
              date="September 10th, 2011"
              venue={{ cityState: "Beloit, WI", name: `Bushel &amp; Peck's` }}
            >
              <p>
                I went to an open mic with some friends. Next thing I know, someone coaxed me to sign up and play a few songs. I only remember covering "Dumb" by Nirvana, and "Bound to pack it up" by the White Stripes on acoustic.
              </p>
            </ShowCard>
          </Card>
        </Col>
      </Row>
    </Container>
  </DefaultView>
);

export default MusicPage;
