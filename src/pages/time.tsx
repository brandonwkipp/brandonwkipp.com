import React from 'react';

import TimeLeft from '@components/TimeLeft';
import DefaultView from '@views/DefaultView';

interface PageProps {
  location: Location;
}

const TimePage = ({ location: { pathname } }: PageProps) => (
  <DefaultView path={pathname}>
    <TimeLeft />
  </DefaultView>
);

export default TimePage;
