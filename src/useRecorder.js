import { useEffect, useState } from 'react';
import { states as recorderStates } from './constants/recorder';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const useRecorder = () => {
  const [recordings, setRecording] = useState([]);
  const [recorderState, setRecorderState] = useState('');
  const [recorder, setRecorder] = useState(null);

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

  useEffect(() => {
    if (recorder === null) {
      if (recorderState === RECORDING) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    updateRecorderState();

    const handleData = e => {
      const newRecording = URL.createObjectURL(e.data);

      setRecording([...recordings, newRecording]);
    };

    recorder.addEventListener('dataavailable', handleData);

    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, recorderState]);

  return [
    recordings,
    recorderState,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording
  ];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

export default useRecorder;
