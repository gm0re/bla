import { useState } from 'react';

import { default as themeConfig } from './theme';

const themeTypes = {
  DARK: 'dark',
  LIGHT: 'light'
};

const themeWithGlobalConfig = mode => ({
  ...mode,
  global: themeConfig.global
});

const useTheme = () => {
  const [theme, setTheme] = useState(themeWithGlobalConfig(themeConfig.colors.light));

  const setLight = () => {
    setTheme(themeWithGlobalConfig(themeConfig.colors.light));
  };

  const setDark = () => {
    setTheme(themeWithGlobalConfig(themeConfig.colors.dark));
  };

  return [
    theme,
    themeTypes,
    setDark,
    setLight
  ];
};

export default useTheme;
