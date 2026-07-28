import { useState, useEffect, useRef } from 'react';

const DeferredSection = ({ children, minHeight = "350px", id }) => {
  // On Desktop (width >= 768px), initialize as visible immediately to prevent layout shifts & ensure 100% Desktop score
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const [isVisible, setIsVisible] = useState(isDesktop);
  const ref = useRef(null);

  useEffect(() => {
    if (isVisible) return;

    // On Mobile (width < 768px), mount when approaching viewport to eliminate 4x CPU main-thread work
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px 0px 100px 0px' }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [isVisible]);

  return (
    <div id={id} ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

export default DeferredSection;
