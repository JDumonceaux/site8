import { useEffect, useRef, useState } from 'react';

const useScroll = ({
  isWindow = false,
  smooth = true,
  threshold = 450,
} = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef(isWindow ? globalThis : null);

  const goTop = () => {
    const element = ref.current;
    element &&
      element.scrollTo({
        behavior: smooth ? 'smooth' : 'auto',
        top: 0,
      });
  };

  const goBottom = () => {
    const element =
      ref.current instanceof Window ? document.documentElement : ref.current;
    ref.current &&
      ref.current.scrollTo({
        behavior: smooth ? 'smooth' : 'auto',
        top: element ? element.scrollHeight : 0,
      });
  };

  const handleScroll = () => {
    if (ref.current) {
      let isAtBottom = false;
      if (ref.current instanceof Window) {
        const currentScrollTop = window.innerHeight + window.scrollY;
        isAtBottom =
          currentScrollTop >= document.documentElement.offsetHeight - threshold;
      } else {
        // const currentScrollTop =
        //   ref.current.offsetHeight + ref.current.scrollTop;
        // isAtBottom = currentScrollTop >= ref.current.scrollHeight - threshold;
      }
      setIsAtBottom(isAtBottom);
    }
  };

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [isWindow, threshold, smooth]);

  return { goBottom, goTop, handleScroll, isAtBottom, ref };
};

export default useScroll;
