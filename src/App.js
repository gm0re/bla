import * as React from "react";
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

library.add(faThumbsUp);

import { ActionsPanel, Recordings } from './components';

import useRecorder from "./useRecorder";

const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
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
    <Wrapper>
      <Recordings recordings={recordings} />
      <ActionsPanel
        pauseRecording={pauseRecording}
        recorderState={recorderState}
        resumeRecording={resumeRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </Wrapper>
  );
}

export default App;
