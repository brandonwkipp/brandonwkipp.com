import {
  ContentfulRichTextGatsbyReference, RenderRichTextData, renderRichText,
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import rendererOptions from '@utils/renderer-options';

import './index.scss';

interface BlogPostProps {
  body: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  date: string;
  id: string;
  title: string;
}

const BlogPost = ({ body, date, id, title }: BlogPostProps) => (
  <Card key={id}>
    <CardTitle className="text-center">
      <h2 className="mt-3">{title}</h2>
      <p>{date}</p>
    </CardTitle>
    <CardBody className="mb-1 mb-md-3 mx-auto px-0">
      {renderRichText(body, rendererOptions)}
    </CardBody>
  </Card>
);

export default BlogPost;
