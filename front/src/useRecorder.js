import { useEffect, useState } from 'react';
import { states as recorderStates } from './constants/recorder';
import { recordingsSvc } from './services';

const { RECORDING, RESUMING, PAUSED, INACTIVE } = recorderStates;

const useRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const [recorderState, setRecorderState] = useState(INACTIVE);
  const [recorder, setRecorder] = useState(null);
  // 👷 WIP: save stream to stop all tracks by getTracks()[0].stop()
  // causing a 🐛 because of tracks removal?
  const [stream, setStream] = useState();

  const requestRecorder = () => (
    navigator.mediaDevices.getUserMedia({ audio: true })
  );

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
    const preloadedRecordings = await recordingsSvc.get() || [];

    setRecordings([...recordings, ...preloadedRecordings]);

    if (recorder === null) {
      if (recorderState === RECORDING) {
        // 👩‍🏭 move to async/await
        requestRecorder()
          .then(newStream => {
            setStream(newStream)
            setRecorder(new MediaRecorder(newStream));
        }, console.error);
      }
      return;
    }

    updateRecorderState();

    const handleData = e => {
      const newRecording = URL.createObjectURL(e.data);

      setRecordings([...recordings, newRecording]);
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

export default useRecorder;
