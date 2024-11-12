import { useLayoutEffect, useState } from 'react';

const preferDarkSchema =
  globalThis.matchMedia &&
  globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = preferDarkSchema ? 'dark' : 'light';

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || defaultTheme,
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { setTheme, theme };
};

export default useTheme;
