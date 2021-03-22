import { useEffect, useState } from 'react';

import { default as themeConfig } from './theme';
import { setIntoLocalStorage, getFromLocalStorage } from '../utils/storage';

const themeTypes = {
  DARK: 'dark',
  LIGHT: 'light'
};

const storageThemeKey = 'theme';

const themeWithGlobalConfig = mode => ({
  ...mode,
  global: themeConfig.global
});

const useTheme = () => {
  const savedTheme = getFromLocalStorage(storageThemeKey);
  const [theme, setTheme] = useState(themeWithGlobalConfig(savedTheme || themeConfig.colors.light));

  const setNewTheme = newTheme => {
    setTheme(themeWithGlobalConfig(newTheme));
    setIntoLocalStorage(storageThemeKey, newTheme);
  };

  const setLight = () => {
    setNewTheme(themeConfig.colors.light);
  };

  const setDark = () => {
    setNewTheme(themeConfig.colors.dark);
  };

  const checkForThemeUpdates = themeSelected => {
    const latestThemeConfig = themeWithGlobalConfig(themeConfig.colors[themeSelected.type]);

    if (JSON.stringify(themeSelected) !== JSON.stringify(latestThemeConfig)) {
      setNewTheme(themeConfig.colors[themeSelected.type]);
      console.log('Theme was updated!');
    }
  };

  useEffect(() => {
    checkForThemeUpdates(theme);
  }, []);

  return [
    theme,
    themeTypes,
    setDark,
    setLight
  ];
};

export default useTheme;
