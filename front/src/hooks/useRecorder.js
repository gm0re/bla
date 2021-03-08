import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { states as recorderStates } from '../constants/recorder';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const useRecorder = setNewRecording => {
  // 👷 WIP: save stream to stop all tracks by getTracks()[0].stop()
  // causing a 🐛 because of tracks removal?
  const [, setStream] = useState();
  const [recorder, setRecorder] = useState(null);
  const [recorderState, setRecorderState] = useState(INACTIVE);
  const { id: parentRecId } = useParams();

  const updateRecorderState = () => {
    const recorderActions = {
      inactive: () => recorder.stop(),
      paused: () => recorder.pause(),
      recording: () => recorder.start(),
      resuming: () => recorder.resume()
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

  const onSetNewRecording = event => {
    setNewRecording(event, parentRecId);
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
      recorder.addEventListener('dataavailable', onSetNewRecording);

      return () => recorder.removeEventListener('dataavailable', onSetNewRecording);
    }
  }, [recorder]);

  return [
    pauseRecording,
    recorderState,
    resumeRecording,
    startRecording,
    stopRecording
  ];
};

export default useRecorder;
