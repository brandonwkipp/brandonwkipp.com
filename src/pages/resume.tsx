import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import Resume from '@components/Resume';

interface PageProps {
  location: Location;
}

const ResumePage = ({ location }: PageProps) => (
  <Layout bg="bg-resume">
    <Header location={location} />
    <Resume />
    <Footer />
  </Layout>
);

export default ResumePage;
