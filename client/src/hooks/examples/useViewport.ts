import { useEffect, useState } from 'react';

export const MOBILE = 'MOBILE';
export const TABLET = 'TABLET';
export const DESKTOP = 'DESKTOP';

const getDevice = (width: number): string => {
  if (width < 768) return MOBILE;
  if (width < 992) return TABLET;
  return DESKTOP;
};

const getInitialViewport = () => {
  const width = window.innerWidth;
  return { device: getDevice(width), width };
};

export const useViewport = () => {
  const [viewport, setViewport] = useState(getInitialViewport);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleResize = () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setViewport({ device: getDevice(width), width });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { viewport };
};

export default useViewport;
