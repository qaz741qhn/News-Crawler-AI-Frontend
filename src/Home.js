import React from 'react';
import Navbar from './Navbar';
import NewsSection from './NewsSection';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <header>
        <h1>Welcome to AI News Digest!</h1>
        <p>Your one-stop-shop for the latest AI news and learning materials.</p>
      </header>
      <NewsSection />
      <Footer />
    </div>
  );
}

export default Home;
