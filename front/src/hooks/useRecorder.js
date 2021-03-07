import { useState, useEffect } from 'react';

import { states as recorderStates } from '../constants/recorder';

import useRecordings from '../hooks/useRecordings';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const useRecorder = () => {
  // 👷 WIP: save stream to stop all tracks by getTracks()[0].stop()
  // causing a 🐛 because of tracks removal?
  const [, setStream] = useState();
  const [recorder, setRecorder] = useState(null);
  const [recorderState, setRecorderState] = useState(INACTIVE);
  const { setNewRecording } = useRecordings();

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
      recorder.addEventListener('dataavailable', setNewRecording);

      return () => recorder.removeEventListener('dataavailable', setNewRecording);
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
