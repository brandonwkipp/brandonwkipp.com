import React from 'react';
import {
  Card, Col, ListGroup, ListGroupItemHeading,
  ListGroupItem, ListGroupItemText, Row,
} from 'reactstrap';
import './index.css';

const TheList = () => (
  <>
    <div className="p-3" id="theList">
      <Row>
        <Col md={6}>
          <Card className="p-3">
            <div className="mb-4">
              <h4>Anti Matter</h4>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    <a href="https://www.youtube.com/watch?v=iJd5nfkb1uk">
                      2011/11/18 - Bushel & Peck’s (Beloit, WI)
                    </a>
                  </ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    2012/01/28? - Mike&apos;s Road House (Beloit, WI))
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    All I remember from this show is that Jonah forgot his cue
                    {' '}
                    during the breakdown in our cover of &quot;Welcome to Paradise.&quot;
                    {' '}
                    I hear this place isn&apos;t that great anymore...
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className="mb-4">
              <h4>Solo</h4>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    ??/??/?? - Bushel & Peck&apos;s (Beloit, WI)
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    Covered &quot;Dumb&quot; by Nirvana, &quot;Bound to pack it up&quot;
                    {' '}
                    by the White Stripes on acoustic guitar.
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className="mb-4">
              <h4>troy & eli</h4>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    2014/04/24 - CHaus (Beloit, WI)
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    Eli and I played a rendition of ordinary people.
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div>
              <h4>troyleft</h4>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>2017/12/29 - Armory (Janesville, WI)</ListGroupItemHeading>
                  <ListGroupItemText>
                    Played guitar on &quot;Pupils of the Pupil&quot;
                    {' '}
                    & ran sound with Frank McKearn IV
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </>
);

export default TheList;
