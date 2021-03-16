import { useEffect, useState } from 'react';

import { default as themeConfig } from './theme';

const themeTypes = Object.keys(themeConfig.colors).map(themeType => themeType);

const useTheme = () => {
  const [theme, setTheme] = useState(themeConfig.colors.light);

  const setLight = () => {
    setTheme(themeConfig.colors.light);
  };

  const setDark = () => {
    setTheme(themeConfig.colors.dark);
  };

  useEffect(() => {
    // ⚒ save/load with local storage
    setTheme(themeConfig.colors.light);
  }, [setTheme]);

  return [
    {
      ...theme,
      global: themeConfig.global
    },
    setDark,
    setLight,
    setTheme,
    themeTypes
  ]
};

export default useTheme;
