import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './theming/GlobalStyles';

import './icons';

import {
  EmptyFeed,
  Header,
  Recorder,
  Settings
} from './components';

import userSvc from './services/user';

import useTheme from './theming/useTheme';
import useRecordings from './hooks/useRecordings';

const Recordings = lazy(() => import('./components/Recordings'));

const GlobalWrapper = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.global.borderRadius.l};
  background-color: ${({ theme }) => theme.colors};
`;

const App = () => {
  const [
    theme,
    themeTypes,
    setDark,
    setLight
  ] = useTheme();

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
