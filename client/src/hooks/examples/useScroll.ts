import { useEffect, useEffectEvent, useRef, useState } from 'react';

const useScroll = ({
  isWindow = false,
  smooth = true,
  threshold = 450,
} = {}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const ref = useRef(isWindow ? globalThis : null);

  const goTop = () => {
    const element = ref.current;
    element?.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      top: 0,
    });
  };

  const goBottom = () => {
    const element =
      ref.current instanceof Window ? document.documentElement : ref.current;
    if (ref.current && element && 'scrollHeight' in element) {
      ref.current.scrollTo({
        behavior: smooth ? 'smooth' : 'auto',
        top: element.scrollHeight,
      });
    }
  };

  const handleScroll = useEffectEvent(() => {
    if (ref.current) {
      let bottomStatus = false;
      if (ref.current instanceof Window) {
        const currentScrollTop = window.innerHeight + window.scrollY;
        bottomStatus =
          currentScrollTop >= document.documentElement.offsetHeight - threshold;
      } else {
        // const currentScrollTop =
        //   ref.current.offsetHeight + ref.current.scrollTop;
        // isAtBottom = currentScrollTop >= ref.current.scrollHeight - threshold;
      }
      setIsAtBottom(bottomStatus);
    }
  });

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {
      // No cleanup needed for non-window case
    };
  }, [isWindow]);

  return { goBottom, goTop, isAtBottom, ref };
};

export default useScroll;
