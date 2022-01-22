import React from 'react';

import Landing from '@components/Landing';
import DefaultView from '@views/DefaultView';

interface PageProps {
  location: {
    pathname: string;
  };
}

const IndexPage = ({ location: { pathname } }: PageProps) => (
  <DefaultView path={pathname}>
    <Landing />
  </DefaultView>
);

export default IndexPage;
