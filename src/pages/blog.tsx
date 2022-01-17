import React from 'react';

import Blog from '@components/Blog';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';

interface PageProps {
  location: Location;
}

const BlogPage = ({ location }: PageProps) => (
  <Layout bg="bg-resume">
    <Header location={location} />
    <Blog />
    <Footer />
  </Layout>
);

export default BlogPage;
