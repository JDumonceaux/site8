import { useEffect, useState } from 'react';

export const MOBILE = 'MOBILE';
export const TABLET = 'TABLET';
export const DESKTOP = 'DESKTOP';

const getDevice = (width: number) => {
  if (width < 768) return MOBILE;
  else if (width < 992) return TABLET;
  return DESKTOP;
};

export const useViewport = () => {
  const [viewport, setViewport] = useState({
    device: getDevice(window.innerWidth),
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        device: getDevice(window.innerWidth),
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { viewport };
};
