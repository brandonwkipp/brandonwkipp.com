import React from 'react';

import Blog from '@components/Blog';
import DefaultView from '@views/DefaultView';

interface PageProps {
  location: Location;
}

const BlogPage = ({ location: { pathname } }: PageProps) => (
  <DefaultView path={pathname}>
    <Blog />
  </DefaultView>
);

export default BlogPage;
