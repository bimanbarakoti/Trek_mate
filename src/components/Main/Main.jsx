import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTop from '../UI/ScrollToTop';
import './Main.css';

function Main({ children }) {
  return (
    <div className="site-root">
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default Main;
