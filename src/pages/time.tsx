import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import TimeLeft from '@components/TimeLeft';

interface PageProps {
  location: Location;
}

const TimeLeftPage = ({ location }: PageProps) => (
  <Layout>
    <Header location={location} />
    <TimeLeft />
    <Footer />
  </Layout>
);

export default TimeLeftPage;
