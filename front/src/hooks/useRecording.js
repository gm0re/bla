import { useEffect, useState } from 'react';

import { recordingsSvc } from '../services';

const RECORDINGS_PER_PAGE = 10;

const useRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  // 🧯 sailsjs blueprint api does not return pages
  const [lastPageReached, setLastPageReached] = useState(false);

  const fetchRecordings = async (page = 0) => {
    if (!lastPageReached) {
      const newPage = RECORDINGS_PER_PAGE * page;
      const newRecordings = await recordingsSvc.get(RECORDINGS_PER_PAGE, newPage);

      if (newRecordings.length) {
        setRecordings(oldRecordings => [...oldRecordings, ...newRecordings]);
      } else {
        setLastPageReached(true);
      }
    }
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

  useEffect(() => {
    fetchRecordings();
  }, []);

  return [
    fetchRecordings,
    recordings,
    setNewRecording
  ];
};

export default useRecordings;
