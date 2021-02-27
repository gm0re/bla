import { useEffect, useState } from 'react';

import recordingsSvc from '../services/recordings';

const useFav = recording => {
  const [hasFaved, setHasFaved] = useState(false);
  const [favs, setFavs] = useState(0);

  // 👨‍🏭 hardcoded userId to be migrated with login
  const hasUserFaved = () => (
    recording.favedBy.some(({ id }) => id === 1)
  );

  const onFav = () => {
    const totalFavs = hasFaved
      ? favs - 1
      : favs + 1;

    if (hasFaved) {
      recordingsSvc.deleteFav({
        recordingId: recording.id,
        userId: 1
      });
    } else {
      recordingsSvc.saveFav({
        recordingId: recording.id,
        userId: 1
      });
    }

    setHasFaved(!hasFaved);
    setFavs(totalFavs);
  };

  useEffect(() => {
    setFavs(recording.favedBy.length);
    setHasFaved(hasUserFaved());
  }, []);

  return [
    favs,
    hasFaved,
    onFav
  ];
};

export default useFav;
