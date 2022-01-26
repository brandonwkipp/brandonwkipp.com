const axios = require('axios');
const beautify = require('js-beautify').html;
const fs = require('fs');
const marked = require('marked');

axios.get('https://raw.githubusercontent.com/brandonwkipp/cv/main/README.md')
  .then((response) => {
    if (response.status === 200) {
      let resume = `
        import React from 'react';
        import { Col, Container, Row } from 'reactstrap';

        import './index.scss';

        const Resume = () => (
          <Container className="py-3">
            <Row>
              <Col md={2} />
              <Col>
      `;

      resume += marked.parse(
        response.data.split('\n').slice(6).join('\n'),
        { headerIds: false, xhtml: true },
      );

      resume += `</Col>
              <Col md={2} />
            </Row>
          </Container>
        );

        export default Resume;
      `;

      fs.writeFileSync(
        'src/components/Resume/index.tsx',
        beautify(
          resume,
          {
            end_with_newline: true,
            indent_size: 2,
            space_around_combinator: true,
          },
        ),
      );
    }
  });
