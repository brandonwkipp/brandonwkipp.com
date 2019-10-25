import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import TimeLeft from '../components/TimeLeft';

const TimeLeftPage = () => (
  <>
    <Layout>
      <Header />
      <TimeLeft />
      <Footer />
    </Layout>
  </>
);

export default TimeLeftPage;
