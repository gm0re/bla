import { useEffect, useState } from 'react';

import { recordingsSvc } from '../services';

const RECORDINGS_PER_PAGE = 10;

const useRecordings = () => {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(RECORDINGS_PER_PAGE);
  const [recordings, setRecordings] = useState([]);

  const fetchRecordings = async () => {
    const newRecordings = await recordingsSvc.get(5, 5);
    setRecordings(oldRecordings => [...oldRecordings, ...newRecordings]);
  };

  // 👷 replace harcoded user with loged user data
  const getUser = () => ({
    profilePic: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAABJ0RVh0U29mdHdhcmUASmRlbnRpY29um8oJfgAAAC1QTFRFAAAA6Ojo6OjoVFRU6OjoVFRUwHXRwHXRwHXRVFRUwHXRwHXRwHXRwHXRwHXR+C2ZeQAAAA90Uk5TAP+/fz///z+/jHJ/RsWMqHD4xAAAAR1JREFUeJzdlVsWwyAIRA0hiX3uf7m1PhAQY9J+tfxE7dwjMFad+5OYQgDN5lmOEKYcAkBSLcusRgXhADB91tVRQTiAXB91dUQIA0Dqg66OHCEMwAMA7xJrUS8lCaCTRFO0CuATo61NoJhp4zqRflyNsNG8fQdokysF2kBbPrXQBNoGV5Pegi2sbFHq4+fSWigBH1Z8lKcUDUCltMUNrqVrpueiaB83oB1sz0Vbb7ncVIPZ1vPGfeP0/bGKzIZOBxc8q33s9HvhSd094HTeofg3djolVE/I2Onx4Tt/vM//gT5wWqOGDBspT85IBCz5zkWGU1dvX5VgATuXMbLrHvAAoN6H8YOi37iC9IoGDRBitxWbV7QipnHyUfzxeAFuLRHx5FWwgAAAAABJRU5ErkJggg==',
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
    setRecordings(await recordingsSvc.get(5, 0) || []);
  }, []);

  return [
    fetchRecordings,
    recordings,
    setNewRecording
  ];
};

export default useRecordings;
