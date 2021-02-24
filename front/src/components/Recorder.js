import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useRecorder from '../hooks/useRecorder';

import { states as recorderStates } from '../constants/recorder';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const RecorderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px;
`;

const ActionButton = styled.button`
  margin: 4px;
`;

const Recorder = ({
  setNewRecording
}) => {
  const [
    pauseRecording,
    recorderState,
    resumeRecording,
    startRecording,
    stopRecording
  ] = useRecorder(setNewRecording);

  return (
    <RecorderWrapper>
      <ActionButton
        onClick={recorderState === PAUSED
          ? resumeRecording
          : startRecording
        }
        disabled={
          recorderState === RECORDING ||
          recorderState === RESUMING
        }
      >
        <FontAwesomeIcon icon={'microphone'} />
      </ActionButton>
      <ActionButton
        onClick={pauseRecording}
        disabled={
          recorderState === PAUSED ||
          recorderState === INACTIVE
        }
      >
        <FontAwesomeIcon icon={'pause'} />
      </ActionButton>
      <ActionButton
        onClick={stopRecording}
        disabled={recorderState === INACTIVE}
      >
        <FontAwesomeIcon icon={'stop'} />
      </ActionButton>
    </RecorderWrapper>
  )
};

Recorder.propTypes = {
  setNewRecording: PropTypes.func
};

export default Recorder;
