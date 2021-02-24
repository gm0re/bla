import { useEffect, useState } from 'react';
import { recordingsSvc } from './services';

const useRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  // 👷 WIP: save stream to stop all tracks by getTracks()[0].stop()
  // causing a 🐛 because of tracks removal?

  const setNewRecording = async ({ data: blob }) => {
    const { size, type } = blob;
    const filename = URL.createObjectURL(blob);

    console.log('NEW REC', blob, filename);

    // 👷 replace harcoded user with loged user data
    const newRecording = {
      duration: 0,
      filename,
      filesize: size,
      filetype: type,
      user: 1
    };

    const newRecordingResp = await recordingsSvc.save(newRecording);

    newRecordingResp.user = {
      userId: 1,
      username: 'gmore'
    };

    // console.log(recordings, recorderState, stream, recorder);

    setRecordings([...recordings, newRecordingResp]);
  };

  useEffect(async() => {
    const preloadedRecordings = await recordingsSvc.get() || [];

    setRecordings(preloadedRecordings);
  }, []);

  return [
    recordings,
    setNewRecording
  ];
};

export default useRecordings;
