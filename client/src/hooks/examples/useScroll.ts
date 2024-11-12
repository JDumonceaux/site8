import { useCallback, useEffect, useRef, useState } from 'react';

const useScroll = ({
  isWindow = false,
  smooth = true,
  threshold = 450,
} = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef(isWindow ? globalThis : null);

  const goTop = useCallback(() => {
    const element = ref.current;
    element &&
      element.scrollTo({
        behavior: smooth ? 'smooth' : 'auto',
        top: 0,
      });
  }, [smooth]);

  const goBottom = useCallback(() => {
    const element =
      ref.current instanceof Window ? document.documentElement : ref.current;
    ref.current &&
      ref.current.scrollTo({
        behavior: smooth ? 'smooth' : 'auto',
        top: element ? element.scrollHeight : 0,
      });
  }, [smooth]);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      // eslint-disable-next-line immutable/no-let
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
  }, [threshold]);

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [isWindow, handleScroll]);

  return { goBottom, goTop, handleScroll, isAtBottom, ref };
};

export default useScroll;
