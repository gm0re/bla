import React, { lazy, Suspense } from "react";
import { Switch, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';

import './icons';

import {
  Recorder,
  EmptyFeed,
  Header
} from './components';

const Recordings = lazy(() => import('./components/Recordings'));

import userSvc from './services/user';

const GlobalWrapper = styled.div`
  font-family: sans-serif;
  width: 50%;
  max-width: 420px;
  min-width: 375px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #fdfafa;
`;

const App = () => {
  // 👩‍🏭 hardcoded user until log in is implemented
  const user = userSvc.get();

  return (
    <GlobalWrapper>
      <Header user={user} />
      <Switch>
        <Redirect exact from="/" to="/recordings" />
        <Route path="/recordings/:id?">
          <Suspense fallback={<EmptyFeed />}>
            <Recordings />
          </Suspense>
          <Recorder />
        </Route>
      </Switch>
    </GlobalWrapper>
  );
}

export default App;
