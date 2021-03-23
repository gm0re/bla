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

  const checkForThemeUpdates = selectedTheme => {
    const latestThemeConfig = themeWithGlobalConfig(themeConfig.colors[selectedTheme.type]);
    const isThemeDiff = JSON.stringify(selectedTheme) !== JSON.stringify(latestThemeConfig);

    if (isThemeDiff) {
      setNewTheme(themeConfig.colors[selectedTheme.type]);
      console.log('Theme was updated!');
    }
  };

  const checkSavedTheme = () => {
    if (!savedTheme) {
      setNewTheme(theme);
    }
  };

  useEffect(() => {
    checkSavedTheme()
    checkForThemeUpdates(theme);
  }, [setNewTheme]);

  return [
    theme,
    themeTypes,
    setDark,
    setLight
  ];
};

export default useTheme;
