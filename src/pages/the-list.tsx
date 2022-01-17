import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import TheList from '@components/TheList';

interface PageProps {
  location: Location;
}

const TheListPage = ({ location }: PageProps) => (
  <Layout>
    <Header location={location} />
    <TheList />
    <Footer />
  </Layout>
);

export default TheListPage;
