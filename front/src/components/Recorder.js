import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useRecorder from '../hooks/useRecorder';

import { states as recorderStates } from '../constants/recorder';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const RecorderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${({ theme }) => theme.global.space.padding.m};
`;

const RecorderButton = styled.button`
  font-size: ${({ theme }) => theme.global.font.size.l};
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`;

const RecordButton = styled(RecorderButton)`
  &:hover {
    transform: scale(1.2);
    transition: transform .1s;
    background-color: red;
    border-radius: 100%;
  }

  background-color: red;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  color: white;
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
      <RecordButton
        onClick={recorderState === PAUSED
          ? resumeRecording
          : startRecording
        }
        hidden={
          recorderState === RECORDING ||
          recorderState === RESUMING
        }
      >
        <FontAwesomeIcon icon={'microphone'} />
      </RecordButton>
      <RecorderButton
        onClick={pauseRecording}
        hidden={
          recorderState === PAUSED ||
          recorderState === INACTIVE
        }
      >
        <FontAwesomeIcon icon={'pause'} />
      </RecorderButton>
      <RecorderButton
        onClick={stopRecording}
        hidden={recorderState === INACTIVE}
      >
        <FontAwesomeIcon icon={'stop'} />
      </RecorderButton>
    </RecorderWrapper>
  )
};

Recorder.propTypes = {
  setNewRecording: PropTypes.func
};

export default Recorder;
