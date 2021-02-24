import * as React from "react";
import styled from 'styled-components';

import './icons';

import {
  Recorder,
  EmptyFeed,
  Header,
  Recordings
} from './components';

import useRecording from "./hooks/useRecording";

const GlobalWrapper = styled.div`
  font-family: sans-serif;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: #00000014;
`;

const App = () => {
  const [
    recordings,
    setNewRecording
  ] = useRecording();

  const user = {
    id: 0,
    username: 'gmore'
  };

  return (
    <GlobalWrapper>
      <Header user={user} />

      {(!recordings.length) && <EmptyFeed />}

      <Recordings recordings={recordings} />
      <Recorder setNewRecording={setNewRecording} />
    </GlobalWrapper>
  );
}

export default App;
