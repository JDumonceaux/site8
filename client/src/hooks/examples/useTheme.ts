import { useLayoutEffect, useState } from 'react';

const getPreferredTheme = (): 'dark' | 'light' => {
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getStoredTheme = (): 'dark' | 'light' | null => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return null;
};

const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return getStoredTheme() ?? getPreferredTheme();
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { setTheme, theme };
};

export default useTheme;
