import { useEffect } from 'react';

const useParallaxEffect = (ref, speed = 0.5) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.pageYOffset;
        ref.current.style.backgroundPositionY = `${offset * speed}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
};

export default useParallaxEffect;