import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Landing from '@components/Landing';
import Layout from '@components/Layout';

const IndexPage = () => (
  <Layout bg="bg-landing">
    <Header />
    <Landing />
    <Footer />
  </Layout>
);

export default IndexPage;
