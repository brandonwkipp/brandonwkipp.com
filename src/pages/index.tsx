import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Landing from '@components/Landing';
import Layout from '@components/Layout';

interface PageProps {
  location: Location;
}

const IndexPage = ({ location }: PageProps) => (
  <Layout bg="bg-landing">
    <Header location={location} />
    <Landing />
    <Footer />
  </Layout>
);

export default IndexPage;
