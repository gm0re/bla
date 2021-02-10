import * as React from "react";
import styled from 'styled-components';

import './icons';

import { ActionsPanel, Recordings } from './components';
import useRecorder from "./useRecorder";

const GlobalWrapper = styled.div`
  font-family: sans-serif;
  width: 50%;
  margin: 0 auto;
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

  return (
    <GlobalWrapper>
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
