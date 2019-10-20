import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LandingPage from '../components/Landing';
import Layout from '../components/Layout';

const IndexPage = () => (
  <>
    <Layout>
      <Header />
      <LandingPage />
      <Footer />
    </Layout>
  </>
);

export default IndexPage;
