import React from 'react';

import Resume from '@components/Resume';
import DefaultView from '@views/DefaultView';

interface PageProps {
  location: Location;
}

const ResumePage = ({ location: { pathname } }: PageProps) => (
  <DefaultView mainClass="resume" noHeightContraint path={pathname}>
    <Resume />
  </DefaultView>
);

export default ResumePage;
