import React, { lazy, Suspense, useState } from "react";
import { Switch, Redirect, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './theming/GlobalStyles';

import './icons';

import {
  EmptyFeed,
  FiltersPanel,
  Header,
  Recorder,
  Settings,
  SubHeader
} from './components';

import userSvc from './services/user';

import useTheme from './theming/useTheme';
import useRecordings from './hooks/useRecordings';

const Recordings = lazy(() => import('./components/Recordings'));

const GlobalWrapper = styled.div`
  width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.global.borderRadius.l};
  background-color: ${({ theme }) => theme.colors};
  position: relative;
`;

const App = () => {
  const [
    theme,
    themeTypes,
    setDark,
    setLight
  ] = useTheme();

  const [
    showFiltersPanel,
    setShowFiltersPanel
  ] = useState(false);

  const [
    fetchRecordings,
    isLastPageReached,
    recordings,
    recordingsCreatedCount,
    setNewRecording
  ] = useRecordings();

  // 👩‍🏭 hardcoded user until log in is implemented
  const user = userSvc.get();

  return (
    <>
      {theme && (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <GlobalWrapper>
            <Header user={user} />
            <SubHeader setShowFiltersPanel={setShowFiltersPanel} />
            {showFiltersPanel && (
              <FiltersPanel setShowFiltersPanel={setShowFiltersPanel} />
            )}
            <Switch>
              <Redirect exact from="/" to="/recordings" />
              <Route path="/recordings/:id?">
                <Suspense fallback={<EmptyFeed />}>
                  <Recordings
                    fetchRecordings={fetchRecordings}
                    isLastPageReached={isLastPageReached}
                    recordings={recordings}
                    recordingsCreatedCount={recordingsCreatedCount}
                  />
                </Suspense>
                <Recorder setNewRecording={setNewRecording} />
              </Route>
              <Route path="/settings">
                <Settings
                  theme={theme}
                  themeTypes={themeTypes}
                  setDark={setDark}
                  setLight={setLight}
                />
              </Route>
            </Switch>
          </GlobalWrapper>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
