import { useEffect, useState } from 'react';

import recordingsSvc from '../services/recordings';

const RECORDINGS_PER_PAGE = 10;

const useRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [recordingsDictionary, setRecordingsDictionary] = useState({});
  const [recordingsCreatedCount, setRecordingsCreatedCount] = useState(0);
  const [isLastPageReached, setIsLastPageReached] = useState(false);

  const sortRecordings = (recA, recB) => ((recA.createdAt > recB.createdAt) ? -1 : 1);

  const recordingsDictReducer = (newRecsDict, recording) => ({
    ...newRecsDict,
    [recording.id]: recording
  });

  const fetchRecordings = async (page = 0, where = undefined, sorting = undefined, refresh = false) => {
    if (!isLastPageReached) {
      const nextPage = RECORDINGS_PER_PAGE * page;
      const newRecordings = await recordingsSvc.get(RECORDINGS_PER_PAGE, nextPage, where, sorting);

      if (newRecordings.length) {
        const shouldResetRecsDictionary = refresh ? {} : { ...recordingsDictionary };
        const newRecsDictionary = newRecordings.reduce(recordingsDictReducer, shouldResetRecsDictionary);

        setRecordingsDictionary(() => newRecsDictionary);
        setRecordings(() => Object.values(newRecsDictionary).sort(sortRecordings));

        // 🧯 sailsjs blueprint api does not return pages
        if (newRecordings.length !== RECORDINGS_PER_PAGE) {
          setIsLastPageReached(true);
        }
      }
    }
  };

  // 👷 replace harcoded user with loged user data
  const getUser = () => ({
    profilePic: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAABJ0RVh0U29mdHdhcmUASmRlbnRpY29um8oJfgAAAC1QTFRFAAAA6Ojo6OjoVFRU6OjoVFRUwHXRwHXRwHXRVFRUwHXRwHXRwHXRwHXRwHXR+C2ZeQAAAA90Uk5TAP+/fz///z+/jHJ/RsWMqHD4xAAAAR1JREFUeJzdlVsWwyAIRA0hiX3uf7m1PhAQY9J+tfxE7dwjMFad+5OYQgDN5lmOEKYcAkBSLcusRgXhADB91tVRQTiAXB91dUQIA0Dqg66OHCEMwAMA7xJrUS8lCaCTRFO0CuATo61NoJhp4zqRflyNsNG8fQdokysF2kBbPrXQBNoGV5Pegi2sbFHq4+fSWigBH1Z8lKcUDUCltMUNrqVrpueiaB83oB1sz0Vbb7ncVIPZ1vPGfeP0/bGKzIZOBxc8q33s9HvhSd094HTeofg3djolVE/I2Onx4Tt/vM//gT5wWqOGDBspT85IBCz5zkWGU1dvX5VgATuXMbLrHvAAoN6H8YOi37iC9IoGDRBitxWbV7QipnHyUfzxeAFuLRHx5FWwgAAAAABJRU5ErkJggg==',
    userId: 1,
    username: 'gmore'
  });

  const attachUserToRecording = recording => ({
    ...recording,
    user: getUser()
  });

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

    setRecordingsCreatedCount(oldRecordingsCreatedCount => oldRecordingsCreatedCount + 1);
    setRecordingsDictionary(oldRecsDictionary => ({
      [recording[recording.id]]: recording,
      ...oldRecsDictionary
    }));
    setRecordings(oldRecordings => [
      recording,
      ...oldRecordings
    ]);
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  return [
    fetchRecordings,
    isLastPageReached,
    recordings,
    recordingsCreatedCount,
    setNewRecording
  ];
};

export default useRecordings;
