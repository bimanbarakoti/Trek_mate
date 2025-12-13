import React, { useEffect, useState } from 'react';
import Button from './Button';
import './ScrollToTop.css';

const ScrollToTop = ({ threshold = 400 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="scroll-to-top" aria-hidden={!visible}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="shadow-lg"
      >
        ↑
      </Button>
    </div>
  );
};

export default ScrollToTop;
