import { useState, useEffect, useRef } from 'react';

const DeferredSection = ({ children, minHeight = "350px", id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is supported, render component when approaching 300px from viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '350px 0px 350px 0px' }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, []);

  return (
    <div id={id} ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

export default DeferredSection;
