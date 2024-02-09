import { useCallback, useEffect, useRef, useState } from 'react';

function useScroll({ threshold = 450, isWindow = false, smooth = true } = {}) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef(isWindow ? window : null);

  const goTop = useCallback(() => {
    const element = ref.current;
    element &&
      element.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
  }, [smooth]);

  const goBottom = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const element =
      ref.current instanceof Window ? document.documentElement : ref.current;
    // ref.current.scrollTo({
    //   top: element.scrollHeight,
    //   behavior: smooth ? 'smooth' : 'auto',
    // });
  }, [smooth]);

  const handleScroll = useCallback(() => {
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
  }, [threshold]);

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isWindow, handleScroll]);

  return { isAtBottom, handleScroll, goTop, goBottom, ref };
}

export default useScroll;
