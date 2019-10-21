import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Blog from '../components/Blog';
import Layout from '../components/Layout';

const blogPage = () => (
  <Layout>
    <Header />
    <Blog />
    <Footer />
  </Layout>
);

export default blogPage;
