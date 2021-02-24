import { useEffect, useState } from 'react';
import { recordingsSvc } from '../services';

const useRecordings = () => {
  const [recordings, setRecordings] = useState([]);

  // 👷 replace harcoded user with loged user data
  const getUser = () => ({
    userId: 1,
    username: 'gmore'
  });

  const attachUserToRecording = recording => {
    recording.user = getUser();
    return recording;
  };

  const setNewRecording = async ({ data: blob }) => {
    const filename = URL.createObjectURL(blob);
    const { size: filesize, type: filetype } = blob;

    const newRecording = {
      duration: 0,
      filename,
      filesize,
      filetype,
      user: 1
    };

    const recording = attachUserToRecording(await recordingsSvc.save(newRecording));

    setRecordings(oldRecordings => [...oldRecordings, recording]);
  };

  useEffect(async() => {
    setRecordings(await recordingsSvc.get() || []);
  }, []);

  return [
    recordings,
    setNewRecording
  ];
};

export default useRecordings;
