import { useState } from 'react';

import recordingsSvc from '../services/recordings';
import userSvc from '../services/user';

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

  const fetchRecordings = async (
    filters,
    page = 0,
    sorting = undefined,
    refresh = true
  ) => {
    if (refresh || !isLastPageReached) {
      const nextPage = RECORDINGS_PER_PAGE * page;

      const newRecordings = await recordingsSvc.get(RECORDINGS_PER_PAGE, nextPage, filters, sorting);

      if (newRecordings.length) {
        const shouldResetRecsDictionary = refresh ? {} : { ...recordingsDictionary };
        const newRecsDictionary = newRecordings.reduce(recordingsDictReducer, shouldResetRecsDictionary);

        setRecordingsDictionary(() => newRecsDictionary);
        setRecordings(() => Object.values(newRecsDictionary).sort(sortRecordings));
      }

      // 🧯 sailsjs blueprint api does not return pages
      if (newRecordings.length !== RECORDINGS_PER_PAGE) {
        setIsLastPageReached(true);
      } else {
        setIsLastPageReached(false);
      }
    }
  };

  const attachUserToRecording = recording => ({
    ...recording,
    user: userSvc.get()
  });

  const setNewRecording = async ({ data: blob }, parentRecId) => {
    const recordingData = new FormData();

    recordingData.append('recording', blob);

    // 👨‍🏭 should be extracted from a user token in the backend
    const { userId } = userSvc.get();

    const recording = attachUserToRecording(await recordingsSvc.save(recordingData, userId, parentRecId));

    setRecordingsCreatedCount(oldRecordingsCreatedCount => oldRecordingsCreatedCount + 1);

    if (parentRecId) {
      recordings[0].replies = [
        recording,
        ...recordings[0].replies
      ];

      setRecordingsDictionary(oldRecsDictionary => ({
        [oldRecsDictionary[parentRecId].replies]: recording,
        ...oldRecsDictionary
      }));
      setRecordings(() => ([...recordings]));
    } else {
      setRecordingsDictionary(oldRecsDictionary => ({
        [recording[recording.id]]: recording,
        ...oldRecsDictionary
      }));
      setRecordings(oldRecordings => [
        recording,
        ...oldRecordings
      ]);
    }
  };

  return [
    fetchRecordings,
    isLastPageReached,
    recordings,
    recordingsCreatedCount,
    setNewRecording
  ];
};

export default useRecordings;
