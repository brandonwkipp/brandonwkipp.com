import React from 'react';
import { Col } from 'reactstrap';

import KnobjectLogo from '../../images/knobject-js.png';
import RaspbeatLogo from '../../images/raspbeat.png';

import './index.scss';

const Landing = () => (
  <>
    <div id="landing">
      <div className="bg-light position-relative overflow-hidden p-3 p-md-5 text-center">
        <Col className="mx-auto my-0 my-md-5 p-lg-5" md={6}>
          <h1 className="d-none d-md-block" id="name">
            Brandon W. Kipp
          </h1>
          <p className="font-weight-normal lead mb-0">
            Web Developer. Musician.
          </p>
        </Col>
        <div className="d-md-block d-none product-device shadow-sm" />
        <div className="d-md-block d-none product-device product-device-2 shadow-sm" />
      </div>
      <div id="projects" className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <a
            className="text-white"
            href="https://github.com/brandonwkipp/raspbeat/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="my-3 py-3">
              <h2 className="display-5">Raspbeat</h2>
              <p className="lead">
                Hacking my way to my own virtual drumset
              </p>
            </div>
            <div className="bg-light mx-auto project-image-container shadow-sm">
              <img
                alt="Raspbeat"
                id="raspbeatLogo"
                src={RaspbeatLogo}
              />
            </div>
          </a>
        </div>
        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <a
            className="text-white"
            href="https://brandonwkipp.github.io/knobject-js"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="my-3 p-3">
              <h2 className="display-5">Knobject</h2>
              <p className="lead">A small Knob-like JavaScript component</p>
            </div>
            <div className="bg-light mx-auto project-image-container shadow-sm">
              <img
                alt="Knobject"
                id="knobjectLogo"
                src={KnobjectLogo}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  </>
);

export default Landing;
