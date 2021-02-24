import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  // 👷 WIP: save stream to stop all tracks by getTracks()[0].stop()
  // causing a 🐛 because of tracks removal?
  const [, setStream] = useState();
  const [recorder, setRecorder] = useState(null);
  const [recorderState, setRecorderState] = useState(INACTIVE);

  const onDataAvailable = (e) => {
    setNewRecording(e);
  };

  const stopRecorder = () => {
    if (recorderState === INACTIVE) {
      recorder.stop();
    }
  };

  const resumeRecorder = () => {
    recorder.resume();
  }

  const updateRecorderState = () => {
    const recorderActions = {
      inactive: () => stopRecorder(),
      paused: () => recorder.pause(),
      recording: () => recorder.start(),
      resuming: () => resumeRecorder()
    };
    recorderActions[recorderState]();
  };

  const startRecording = () => {
    setRecorderState(RECORDING);
  };

  const resumeRecording = () => {
    setRecorderState(RESUMING);
  };

  const pauseRecording = () => {
    setRecorderState(PAUSED);
  };

  const stopRecording = () => {
    setRecorderState(INACTIVE);
  };

  useEffect(async() => {
    if (recorder === null) {
      if (recorderState === RECORDING) {
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });

          setRecorder(new MediaRecorder(newStream));
          setStream(newStream);
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    updateRecorderState();
  }, [recorderState]);

  useEffect(() => {
    if (recorder !== null) {
      recorder.start();
      recorder.addEventListener('dataavailable', onDataAvailable);

      return () => recorder.removeEventListener('dataavailable', onDataAvailable);
    }
  }, [recorder]);

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
        <FontAwesomeIcon
          icon={'microphone'}
        />
      </ActionButton>
      <ActionButton
        onClick={pauseRecording}
        disabled={
          recorderState === PAUSED ||
          recorderState === INACTIVE
        }
      >
        <FontAwesomeIcon
          icon={'pause'}
        />
      </ActionButton>
      <ActionButton
        onClick={stopRecording}
        disabled={recorderState === INACTIVE}
      >
        <FontAwesomeIcon
          icon={'stop'}
        />
      </ActionButton>
    </RecorderWrapper>
  )
};

Recorder.propTypes = {
  setNewRecording: PropTypes.func
};

export default Recorder;
