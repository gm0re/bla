import { useEffect, useState } from 'react';

import { default as themeConfig } from './theme';

const useTheme = () => {
  const [theme, setTheme] = useState(themeConfig.colors.light);

  useEffect(() => {
    // ⚒ save/load with local storage
    setTheme(themeConfig.colors.light);
  }, [setTheme]);

  return [
    {
      ...theme,
      global: themeConfig.global
    },
    setTheme
  ]
};

export default useTheme;
