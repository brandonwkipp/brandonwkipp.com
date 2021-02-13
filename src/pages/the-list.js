import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import TheList from '@components/TheList';

const TheListPage = () => (
  <>
    <Layout>
      <Header />
      <TheList />
      <Footer />
    </Layout>
  </>
);

export default TheListPage;
