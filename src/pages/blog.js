import React from 'react';

import Blog from '@components/Blog';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';

const BlogPage = () => (
  <Layout>
    <Header />
    <Blog />
    <Footer />
  </Layout>
);

export default BlogPage;
