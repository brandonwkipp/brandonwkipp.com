import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import DefaultView from '@views/DefaultView';

import './index.scss';

interface PageProps {
location: Location;
}

const ResumePage = ({ location: { pathname } }: PageProps) => (
<DefaultView mainClass="resume" noHeightContraint path={pathname}>
  <Container className="py-3">
    <Row>
      <Col md={2} />
      <Col>
      <h2><span role="image">&#128104;&#8205;&#128187;</span> Technical Experience</h2>
      <p><strong>Full Stack Developer</strong> @ <a href="https://sierrainteractive.com/">Sierra Interactive</a> <em>(Aug 2021–Mar 2022)</em><br />
        The most powerful, end-to-end real estate platform available.</p>
      <ul>
        <li>Conversion of JavaScript/jQuery/ASPX pages into modernized React components with TypeScript</li>
        <li>Third-party API (Google Ads, Structurely) integration development for the admin portal website</li>
        <li>Documentation of developer onboarding, stack overview, and development standards</li>
      </ul>
      <p><strong><em>Technologies used:</em></strong> React, TypeScript, Node.js, Postman, C#, .NET, Microsoft SQL Server</p>
      <p><strong>Full Stack Developer</strong> @ <a href="https://smm.org/">Science Museum of Minnesota</a> <em>(Mar 2019–Aug 2021)</em><br />
        A place for everyone to turn on the science, inspire learning, inform policy, and improve lives.</p>
      <ul>
        <li>User experience design, feature development, &amp; accessibility compliance on the main <a href="https://smm.org/">website</a></li>
        <li>React SPA development &amp; Arduino development for interactive museum exhibits around the world</li>
        <li>REST / GraphQL API and serverless application development</li>
        <li>Infrastructure provisioning, end-to-end testing, and CI/CD pipeline automation</li>
        <li>CMS integration, data modeling, schema customization, and migration scripting</li>
      </ul>
      <p><strong><em>Technologies used:</em></strong> Node.js, React, TypeScript, Gatsby, GraphQL, Apollo, Cypress, Contentful, Electron, Express.js, Docker, Github Actions, Amazon Web Services, Google Cloud Platform, Terraform, Arduino, Raspberry Pi</p>
      <p><strong><em>Selected open-source work:</em></strong></p>
      <ul>
        <li><a href="https://github.com/scimusmn/app-template">app-template</a>, a boilerplate Gatsby project for creating new exhibit applications</li>
        <li><a href="https://github.com/scimusmn/arduino-base">arduino-base</a>, a curated Arduino library for enabling rapid prototyping and serial communication between React applications and microcontrollers</li>
        <li><a href="https://github.com/scimusmn/stele">stele</a>, a kiosk browser built to safely house exhibit applications
          <hr />
        </li>
      </ul>
      <p><strong>Junior Developer</strong> @ <a href="https://www.auctionharmony.com/">Auction Harmony</a> <em>(Aug 2016–Mar 2019)</em><br />
        Professional event management service helping nonprofits raise millions for those in need.</p>
      <ul>
        <li>Cross-browser, responsive SaaS application development with a focus on User Experience</li>
        <li>Network administration and troubleshooting for high-traffic fundraising events</li>
        <li>Produced hundreds of customized templates including website themes, PDFs, and event-related materials</li>
      </ul>
      <p><strong><em>Technologies used:</em></strong> PHP, Java, PostgreSQL, Swagger, Google Web Toolkit, HTML, CSS, JavaScript</p>
      <hr />
      <h2><span role="image">&#127911;</span> Audio Engineering Experience</h2>
      <p><strong>Community Volunteer</strong> @ <a href="https://www.beloit.edu/celeb/recording-studio/">Maple Tree Studio</a> <em>(Jan 2013–May 2016)</em><br /></p>
      <hr />
      <h2><span role="image">&#128172;</span> Communication</h2>
      <p><strong>Language</strong>: English (Native)<br />
        <strong>Timezone</strong>: UTC−06:00 (Central Standard Time) / UTC−05:00 (Central Daylight Time)
      </p>
      <hr />
      <h2><span role="image">&#128104;&#8205;&#127891;</span> Education</h2>
      <p><strong>Madison Media Institute</strong> - Madison, Wisconsin <em>(Sep 2011–Feb 2013)</em><br />
        <em>Associate of Applied Science</em>, Recording &amp; Music Technology
      </p>
      <p><strong><a href="https://www.beloit.edu/">Beloit College</a></strong> - Beloit, Wisconsin <em>(Sep 2009–May 2011)</em><br />
        Studied Music Theory &amp; Composition</p>
      </Col>
      <Col md={2} />
    </Row>
  </Container>
</DefaultView>
);

export default ResumePage;
