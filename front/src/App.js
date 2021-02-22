import * as React from "react";
import styled from 'styled-components';

import './icons';

import {
  ActionsPanel,
  EmptyFeed,
  Header,
  Recordings
} from './components';

import useRecorder from "./useRecorder";

const GlobalWrapper = styled.div`
  font-family: sans-serif;
  width: 50%;
  margin: auto;
`;

const App = () => {
  const [
    recordings,
    recorderState,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording
  ] = useRecorder();

  const user = {
    id: 0,
    username: 'gmore'
  };

  return (
    <GlobalWrapper>
      <Header
        user={user}
      />
      {!recordings.length && <EmptyFeed />}
      <Recordings recordings={recordings} />
      <ActionsPanel
        pauseRecording={pauseRecording}
        recorderState={recorderState}
        resumeRecording={resumeRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </GlobalWrapper>
  );
}

export default App;
